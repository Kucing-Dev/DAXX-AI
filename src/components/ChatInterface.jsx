import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Plus, Menu, User, Settings, MessageSquare, Trash2, Edit2, Check, X, Key, Moon, Type, Zap, Paperclip, Image, FileText, File, Video, Music, Code, Bot, ChevronDown, MoreVertical, Languages, BarChart3, Search, Database } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAttachedFiles } from '../hooks/useAttachedFiles';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import ApiKeysModal from './modals/ApiKeysModal';
import SettingsModal from './modals/SettingsModal';

export default function ChatInterface() {
  const { state, dispatch } = useChat();
  const { attachedFiles, addFile, removeFile, clearAllFiles } = useAttachedFiles();
  
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeepResearchModal, setShowDeepResearchModal] = useState(false);
  const [showOtherFeaturesModal, setShowOtherFeaturesModal] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showNewChatMenu, setShowNewChatMenu] = useState(false);
  const [newApiName, setNewApiName] = useState('');
  const [newApiKey, setNewApiKey] = useState('');
  
  const fileInputRef = useRef(null);

  const currentChat = state.chats.find(c => c.id === state.currentChatId);

  const modes = [
    { id: 'general', name: 'General', icon: MessageSquare, color: 'blue' },
    { id: 'coding', name: 'Coding', icon: Code, color: 'green' },
    { id: 'writing', name: 'Writing', icon: Type, color: 'purple' },
    { id: 'research', name: 'Research', icon: FileText, color: 'yellow' },
    { id: 'translation', name: 'Translation', icon: Languages, color: 'indigo' },
    { id: 'analysis', name: 'Analysis', icon: BarChart3, color: 'red' }
  ];

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', description: 'Most capable' },
    { id: 'gpt-3.5', name: 'GPT-3.5', provider: 'OpenAI', description: 'Fast & efficient' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', description: 'Advanced reasoning' },
    { id: 'claude-2', name: 'Claude 2', provider: 'Anthropic', description: 'Balanced' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', description: 'Multimodal' },
    { id: 'llama-2', name: 'Llama 2', provider: 'Meta', description: 'Open source' },
    { id: 'mistral-7b', name: 'Mistral 7B', provider: 'Mistral AI', description: 'High-performance open model' },
    { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', provider: 'Mistral AI', description: 'Sparse mixture of experts' },
    { id: 'palm-2', name: 'PaLM 2', provider: 'Google', description: 'Improved reasoning and multilingual' },
    { id: 'llama-3', name: 'Llama 3', provider: 'Meta', description: 'Next generation open model' },
    { id: 'command-r', name: 'Command R', provider: 'Cohere', description: 'Optimized for RAG tasks' },
    { id: 'command-r-plus', name: 'Command R+', provider: 'Cohere', description: 'Most powerful RAG model' }
  ];

  const currentModeObj = modes.find(m => m.id === state.currentMode);
  const currentModelObj = aiModels.find(m => m.id === state.currentModel);

  const handleSend = useCallback(() => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      files: attachedFiles.length > 0 ? [...attachedFiles] : null,
      timestamp: new Date()
    };

    // Add user message
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        chatId: state.currentChatId,
        message: userMessage
      }
    });

    // Update chat title if it's the first message
    if (currentChat && currentChat.messages.length === 0) {
      dispatch({
        type: 'UPDATE_CHAT_TITLE',
        payload: {
          chatId: state.currentChatId,
          title: input.slice(0, 30) + (input.length > 30 ? '...' : '')
        }
      });
    }

    // Clear input and files
    setInput('');
    clearAllFiles();

    // Simulate DAXX response after a delay
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `This is a simulated response to: "${input}". In a real implementation, this would connect to DAXX API.`,
        timestamp: new Date()
      };
      
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          chatId: state.currentChatId,
          message: aiMessage
        }
      });
    }, 1000);
  }, [input, attachedFiles, state.currentChatId, currentChat, dispatch, clearAllFiles]);

  const handleNewChat = useCallback(() => {
    const newChat = { 
      id: Date.now(), 
      title: 'New Chat', 
      messages: [], 
      createdAt: new Date() 
    };
    dispatch({ type: 'ADD_CHAT', payload: newChat });
  }, [dispatch]);

  const handleDeleteChat = useCallback((chatId) => {
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  }, [dispatch]);

  const handleRenameChat = useCallback((chatId) => {
    dispatch({
      type: 'UPDATE_CHAT_TITLE',
      payload: {
        chatId,
        title: editTitle
      }
    });
    setEditingChatId(null);
    setEditTitle('');
  }, [editTitle, dispatch]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Clear all chat history? This cannot be undone.')) {
      dispatch({ type: 'CLEAR_HISTORY' });
      setShowNewChatMenu(false);
    }
  }, [dispatch]);

  const handleAddApiKey = useCallback(() => {
    if (!newApiName.trim() || !newApiKey.trim() || state.apiKeys.length >= 10) return;

    dispatch({
      type: 'ADD_API_KEY',
      payload: {
        id: Date.now(),
        name: newApiName,
        key: newApiKey,
        provider: 'Custom DAXX',
        createdAt: new Date().toLocaleDateString()
      }
    });
    
    setNewApiName('');
    setNewApiKey('');
  }, [newApiName, newApiKey, state.apiKeys.length, dispatch]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => addFile(file));
    setShowAttachMenu(false);
  }, [addFile]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        chats={state.chats}
        currentChatId={state.currentChatId}
        sidebarOpen={sidebarOpen}
        showNewChatMenu={showNewChatMenu}
        setShowNewChatMenu={setShowNewChatMenu}
        handleNewChat={handleNewChat}
        handleDeleteChat={handleDeleteChat}
        handleClearHistory={handleClearHistory}
        setCurrentChatId={(id) => dispatch({ type: 'SET_CURRENT_CHAT', payload: id })}
        editingChatId={editingChatId}
        setEditingChatId={setEditingChatId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        handleRenameChat={handleRenameChat}
        setShowApiModal={setShowApiModal}
        setShowSettingsModal={setShowSettingsModal}
        setShowDeepResearchModal={setShowDeepResearchModal}
        setShowOtherFeaturesModal={setShowOtherFeaturesModal}
        apiKeysCount={state.apiKeys.length}
      />
      
      <ChatArea
        currentChat={currentChat}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        attachedFiles={attachedFiles}
        removeFile={removeFile}
        showAttachMenu={showAttachMenu}
        setShowAttachMenu={setShowAttachMenu}
        showModeMenu={showModeMenu}
        setShowModeMenu={setShowModeMenu}
        showModelMenu={showModelMenu}
        setShowModelMenu={setShowModelMenu}
        currentModeObj={currentModeObj}
        currentModelObj={currentModelObj}
        modes={modes}
        setCurrentMode={(mode) => dispatch({ type: 'SET_CURRENT_MODE', payload: mode })}
        aiModels={aiModels}
        setCurrentModel={(model) => dispatch({ type: 'SET_CURRENT_MODEL', payload: model })}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
        disabled={!input.trim() && attachedFiles.length === 0}
      />

      <ApiKeysModal
        showApiModal={showApiModal}
        setShowApiModal={setShowApiModal}
        apiKeys={state.apiKeys}
        newApiName={newApiName}
        setNewApiName={setNewApiName}
        newApiKey={newApiKey}
        setNewApiKey={setNewApiKey}
        handleAddApiKey={handleAddApiKey}
        removeApiKey={(id) => dispatch({ type: 'REMOVE_API_KEY', payload: id })}
      />

      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        settings={state.settings}
        updateSettings={(settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings })}
      />

      {/* Deep Research Modal */}
      {showDeepResearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeepResearchModal(false)}>
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Deep Research Assistant</h2>
                <p className="text-sm text-gray-400 mt-1">Advanced research and analysis tools</p>
              </div>
              <button onClick={() => setShowDeepResearchModal(false)} className="p-2 hover:bg-gray-700 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Search size={20} />
                    Research Query
                  </h3>
                  <p className="text-gray-400 mt-1">Enter your research topic or question</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Quantum computing applications in cryptography"
                      className="flex-1 bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium">
                      Search
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Database size={20} />
                    Data Sources
                  </h3>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                      <span>Academic Journals</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                      <span>News Articles</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                      <span>Books & Publications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-gray-700 border-gray-600" defaultChecked />
                      <span>Research Papers</span>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <BarChart3 size={20} />
                    Analysis Tools
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors text-sm">
                      Trend Analysis
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors text-sm">
                      Citation Mapping
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors text-sm">
                      Concept Clustering
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors text-sm">
                      Impact Metrics
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end">
              <button 
                onClick={() => setShowDeepResearchModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Creator Information */}
      <div className="fixed bottom-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-tl-lg text-xs text-gray-400">
        DAXX AI Assistant v1.0.0 | Created by Rasya Andrean
      </div>
    </div>
  );
}