import React from 'react';
import { MessageSquare, Plus, MoreVertical, Trash2, Edit2, Check, X, Key, Settings, Search, BookOpen, Lightbulb, Database } from 'lucide-react';

export default function Sidebar({
  chats,
  currentChatId,
  sidebarOpen,
  showNewChatMenu,
  setShowNewChatMenu,
  handleNewChat,
  handleDeleteChat,
  handleClearHistory,
  setCurrentChatId,
  editingChatId,
  setEditingChatId,
  editTitle,
  setEditTitle,
  handleRenameChat,
  setShowApiModal,
  setShowSettingsModal,
  apiKeysCount,
  // New props for additional features
  setShowDeepResearchModal,
  setShowOtherFeaturesModal
}) {
  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-950 flex flex-col overflow-hidden`}>
      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleNewChat}
            className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowNewChatMenu(!showNewChatMenu)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MoreVertical size={18} />
            </button>

            {showNewChatMenu && (
              <div className="absolute top-full right-0 mt-1 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 min-w-[180px] z-20">
                <button
                  onClick={handleClearHistory}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-600 hover:bg-opacity-20 transition-colors text-left text-red-500"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Clear History</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deep Research Section */}
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Deep Research</h3>
        <div className="space-y-1">
          <button 
            onClick={() => setShowDeepResearchModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm"
          >
            <Search size={16} />
            <span>Research Assistant</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <Database size={16} />
            <span>Data Analysis</span>
          </button>
        </div>
      </div>

      {/* Other Features Section */}
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Other Features</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <BookOpen size={16} />
            <span>Knowledge Base</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <Lightbulb size={16} />
            <span>Ideas Generator</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              currentChatId === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
            onClick={() => setCurrentChatId(chat.id)}
          >
            <MessageSquare size={16} className="flex-shrink-0" />
            
            {editingChatId === chat.id ? (
              <div className="flex items-center gap-1 flex-1" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleRenameChat(chat.id)}
                  className="flex-1 bg-gray-700 px-2 py-1 rounded text-sm"
                  autoFocus
                />
                <button onClick={() => handleRenameChat(chat.id)} className="p-1 hover:bg-gray-700 rounded">
                  <Check size={14} />
                </button>
                <button onClick={() => setEditingChatId(null)} className="p-1 hover:bg-gray-700 rounded">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 truncate text-sm">{chat.title}</span>
                <div className="hidden group-hover:flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => {
                      setEditingChatId(chat.id);
                      setEditTitle(chat.title);
                    }}
                    className="p-1 hover:bg-gray-700 rounded"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteChat(chat.id)}
                    className="p-1 hover:bg-gray-700 rounded"
                    disabled={chats.length === 1}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-800 space-y-1">
        <button 
          onClick={() => setShowApiModal(true)}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm"
        >
          <Key size={16} />
          <span>API Keys</span>
          <span className="ml-auto text-xs bg-blue-600 px-2 py-0.5 rounded-full">{apiKeysCount}/10</span>
        </button>
        <button 
          onClick={() => setShowSettingsModal(true)}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm"
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}