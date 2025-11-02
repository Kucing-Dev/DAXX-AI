import React from 'react';
import { X, Moon, Type, Zap } from 'lucide-react';

export default function SettingsModal({
  showSettingsModal,
  setShowSettingsModal,
  settings,
  updateSettings
}) {
  if (!showSettingsModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowSettingsModal(false)}>
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-sm text-gray-400 mt-1">Customize your experience</p>
          </div>
          <button onClick={() => setShowSettingsModal(false)} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Moon size={18} />
                <span className="font-semibold">Theme</span>
              </div>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value })}
                className="bg-gray-800 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <p className="text-sm text-gray-400">Choose your preferred color theme</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Type size={18} />
                <span className="font-semibold">Font Size</span>
              </div>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: e.target.value })}
                className="bg-gray-800 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <p className="text-sm text-gray-400">Adjust text size for better readability</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={18} />
                <span className="font-semibold">Stream Response</span>
              </div>
              <button
                onClick={() => updateSettings({ streamResponse: !settings.streamResponse })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.streamResponse ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.streamResponse ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <p className="text-sm text-gray-400">Show DAXX responses as they're generated</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Sound Effects</span>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <p className="text-sm text-gray-400">Enable notification sounds</p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}