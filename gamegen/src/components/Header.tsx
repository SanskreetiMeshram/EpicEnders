import React from 'react';
import { 
  Play, 
  Save, 
  Upload, 
  Download, 
  Users, 
  Settings, 
  HelpCircle,
  Gamepad2,
  Zap,
  Pause,
  Share
} from 'lucide-react';
import { useGame } from '../context/GameContext';

const Header: React.FC = () => {
  const { state, togglePlayMode, saveGame, exportGame } = useGame();

  const handleShare = () => {
    const gameData = {
      objects: state.objects,
      settings: state.settings,
      template: state.currentTemplate
    };
    
    const shareUrl = `${window.location.origin}?game=${btoa(JSON.stringify(gameData))}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Game link copied to clipboard! Share it with friends.');
  };

  return (
    <header className="h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            EpicEnders
          </h1>
          <p className="text-xs text-gray-400">Professional Game Studio</p>
        </div>
      </div>

      {/* Center Controls */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={togglePlayMode}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg font-medium ${
            state.isPlaying 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-green-500/25'
          }`}
        >
          {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{state.isPlaying ? 'Stop Test' : 'Play Test'}</span>
        </button>
        
        <button 
          onClick={saveGame}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        
        <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25">
          <Zap className="w-4 h-4" />
          <span>AI Create</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        <button 
          onClick={exportGame}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors" 
          title="Export Game"
        >
          <Download className="w-5 h-5" />
        </button>
        <button 
          onClick={handleShare}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors" 
          title="Share Game"
        >
          <Share className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Users className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center ml-4">
          <span className="text-sm font-bold">U</span>
        </div>
      </div>
    </header>
  );
};

export default Header;