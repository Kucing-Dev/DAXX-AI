import React from 'react';
import { X, Key, Plus, Trash2 } from 'lucide-react';
import { maskApiKey } from '../../utils/helpers';

export default function ApiKeysModal({
  showApiModal,
  setShowApiModal,
  apiKeys,
  newApiName,
  setNewApiName,
  newApiKey,
  setNewApiKey,
  handleAddApiKey,
  removeApiKey
}) {
  if (!showApiModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowApiModal(false)}>
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">API Keys Management</h2>
            <p className="text-sm text-gray-400 mt-1">Manage your API keys ({apiKeys.length}/10)</p>
          </div>
          <button onClick={() => setShowApiModal(false)} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Plus size={18} />Add New API Key
            </h3>
            <input
              type="text"
              placeholder="Provider Name (e.g., DAXX, Claude)"
              value={newApiName}
              onChange={(e) => setNewApiName(e.target.value)}
              className="w-full bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="w-full bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddApiKey}
              disabled={apiKeys.length >= 10}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors font-medium"
            >
              {apiKeys.length >= 10 ? 'Maximum Limit Reached' : 'Add API Key'}
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Key size={18} />Your API Keys
            </h3>
            {apiKeys.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Key size={32} className="mx-auto mb-2 opacity-50" />
                <p>No API Keys yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {apiKeys.map(key => (
                  <div key={key.id} className="bg-gray-900 rounded-lg p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{key.name}</h4>
                        <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{key.provider}</span>
                      </div>
                      <p className="text-sm text-gray-400 font-mono truncate">{maskApiKey(key.key)}</p>
                      <p className="text-xs text-gray-500 mt-1">Added: {key.createdAt}</p>
                    </div>
                    <button
                      onClick={() => removeApiKey(key.id)}
                      className="p-2 hover:bg-red-600 hover:bg-opacity-20 rounded-lg transition-colors text-red-500"
                      aria-label="Delete API key"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}