import React, { useRef } from 'react';
import { 
  Menu, MessageSquare, User, Image, Video, Music, FileText, File, Code,
  Send, Paperclip, ChevronDown, Bot, Check, X
} from 'lucide-react';
import { formatFileSize, getFileIcon } from '../utils/helpers';

export default function ChatArea({ 
  currentChat, 
  sidebarOpen, 
  setSidebarOpen,
  // Input area props
  input,
  setInput,
  handleSend,
  attachedFiles,
  removeFile,
  showAttachMenu,
  setShowAttachMenu,
  showModeMenu,
  setShowModeMenu,
  showModelMenu,
  setShowModelMenu,
  currentModeObj,
  currentModelObj,
  modes,
  setCurrentMode,
  aiModels,
  setCurrentModel,
  fileInputRef,
  handleFileSelect,
  disabled
}) {
  const messagesEndRef = useRef(null);

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-4 gap-3">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold">{currentChat?.title}</h1>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {currentChat?.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center space-y-4">
              <MessageSquare size={48} className="mx-auto opacity-50" />
              <p className="text-xl">How can I help you today?</p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {currentChat?.messages.map(msg => (
              <article 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">DAXX</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.files && msg.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.files.map(file => (
                        <div key={file.id} className="flex items-center gap-2 bg-gray-700 px-2 py-1 rounded text-xs">
                          <FileIcon type={file.type} />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                )}
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Moved to bottom right */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map(file => (
                <div key={file.id} className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg group">
                  <div className="text-blue-400">
                    {getFileIconComponent(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate max-w-[150px]">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
                    aria-label="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <div className="flex items-center bg-gray-800 rounded-xl shadow-lg">
              {/* Attach Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="p-3 m-1 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Attach files"
                >
                  <Paperclip size={18} />
                </button>

                {showAttachMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-2 min-w-[200px] z-10">
                    {[
                      { icon: Image, label: 'Image', desc: 'JPG, PNG, GIF', color: 'purple' },
                      { icon: FileText, label: 'Document', desc: 'PDF, DOC, TXT', color: 'blue' },
                      { icon: Video, label: 'Video', desc: 'MP4, MOV, AVI', color: 'red' },
                      { icon: Music, label: 'Audio', desc: 'MP3, WAV, OGG', color: 'green' },
                      { icon: File, label: 'Other', desc: 'Any file type', color: 'gray' }
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors text-left"
                      >
                        <item.icon size={18} className="text-purple-400" />
                        <div>
                          <p className="text-sm font-medium">Upload {item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mode Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowModeMenu(!showModeMenu)}
                  className={`px-3 py-2 m-1 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${
                    currentModeObj?.id === 'coding' ? 'text-green-400' : 'text-blue-400'
                  }`}
                >
                  {currentModeObj && React.createElement(currentModeObj.icon, { size: 16 })}
                  <span>{currentModeObj?.name}</span>
                  <ChevronDown size={14} />
                </button>

                {showModeMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 min-w-[160px] z-10">
                    {modes.map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setCurrentMode(mode.id);
                          setShowModeMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors text-left ${
                          currentModeObj?.id === mode.id ? 'bg-gray-800' : ''
                        }`}
                      >
                        {React.createElement(mode.icon, { size: 16, className: mode.id === 'coding' ? 'text-green-400' : 'text-blue-400' })}
                        <span className="text-sm font-medium">{mode.name}</span>
                        {currentModeObj?.id === mode.id && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Message DAXX..."
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none"
                />
                
                <button
                  onClick={handleSend}
                  disabled={disabled}
                  className={`p-3 m-1 rounded-lg transition-colors ${
                    !disabled
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

            {/* Model Selector */}
            <div className="mt-2 flex items-center justify-between">
              <div className="relative">
                <button
                  onClick={() => setShowModelMenu(!showModelMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-xs"
                >
                  <Bot size={14} />
                  <span className="font-medium">{currentModelObj?.name}</span>
                  <span className="text-gray-500">({currentModelObj?.provider})</span>
                  <ChevronDown size={12} />
                </button>

                {showModelMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-2 min-w-[280px] z-10">
                    <div className="px-3 py-2 border-b border-gray-700">
                      <p className="text-xs font-semibold text-gray-400">SELECT AI MODEL</p>
                    </div>
                    {aiModels.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setCurrentModel(model.id);
                          setShowModelMenu(false);
                        }}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 hover:bg-gray-800 transition-colors text-left ${
                          currentModelObj?.id === model.id ? 'bg-gray-800' : ''
                        }`}
                      >
                        <Bot size={16} className="text-purple-400 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{model.name}</p>
                            {currentModelObj?.id === model.id && <Check size={12} className="text-green-400" />}
                          </div>
                          <p className="text-xs text-gray-500">{model.provider} • {model.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500">DAXX can make mistakes. Check important info.</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="*/*"
          />
        </div>
      </div>
    </main>
  );
}

function FileIcon({ type }) {
  if (type.startsWith('image/')) return <Image size={16} />;
  if (type.startsWith('video/')) return <Video size={16} />;
  if (type.startsWith('audio/')) return <Music size={16} />;
  if (type.includes('pdf') || type.includes('document')) return <FileText size={16} />;
  if (type.includes('code') || type.includes('text')) return <Code size={16} />;
  return <File size={16} />;
}

function getFileIconComponent(type) {
  const iconType = getFileIcon(type);
  switch (iconType) {
    case 'image': return <Image size={16} />;
    case 'video': return <Video size={16} />;
    case 'audio': return <Music size={16} />;
    case 'document': return <FileText size={16} />;
    case 'code': return <Code size={16} />;
    default: return <File size={16} />;
  }
}