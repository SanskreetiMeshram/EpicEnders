import React, { useState } from 'react';
import { 
  Move, 
  RotateCcw, 
  Scale, 
  Eye, 
  Grid3X3, 
  Layers,
  MousePointer,
  Box,
  Camera,
  Lightbulb,
  Trash2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import GameEngine from './GameEngine';

const MainEditor: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const { state, selectObject, updateObject, deleteObject, dispatch } = useGame();

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'rotate', icon: RotateCcw, label: 'Rotate' },
    { id: 'scale', icon: Scale, label: 'Scale' },
  ];

  const handleObjectClick = (objectId: string) => {
    selectObject(objectId);
  };

  const handleObjectDrag = (objectId: string, newPosition: { x: number; y: number }) => {
    updateObject(objectId, {
      position: {
        ...state.objects.find(obj => obj.id === objectId)?.position || { x: 0, y: 0, z: 0 },
        x: (newPosition.x - 400) / 50, // Convert screen coordinates to world coordinates
        y: -(newPosition.y - 300) / 50
      }
    });
  };

  const handleDeleteSelected = () => {
    if (state.selectedObject) {
      deleteObject(state.selectedObject.id);
    }
  };

  const setViewMode = (mode: '2D' | '3D') => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <GameEngine isPlaying={state.isPlaying} />
      
      {/* Editor Toolbar */}
      <div className="h-12 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 flex items-center justify-between px-4">
        <div className="flex items-center space-x-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                selectedTool === tool.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'hover:bg-gray-600 text-gray-300 hover:text-white'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-600 mx-2" />
          
          <button className="p-2 rounded-lg hover:bg-gray-600 text-gray-300 hover:text-white transition-all" title="Toggle Grid">
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-600 text-gray-300 hover:text-white transition-all" title="Layers">
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-600 text-gray-300 hover:text-white transition-all" title="Lighting">
            <Lightbulb className="w-4 h-4" />
          </button>
          
          {state.selectedObject && (
            <button 
              onClick={handleDeleteSelected}
              className="p-2 rounded-lg hover:bg-red-600 text-gray-300 hover:text-white transition-all ml-2" 
              title="Delete Selected"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('2D')}
              className={`px-3 py-1 rounded text-sm transition-all ${
                state.viewMode === '2D' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              2D
            </button>
            <button
              onClick={() => setViewMode('3D')}
              className={`px-3 py-1 rounded text-sm transition-all ${
                state.viewMode === '3D' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              3D
            </button>
          </div>
          
          <button className="p-2 rounded-lg hover:bg-gray-600 text-gray-300 hover:text-white transition-all" title="Camera Settings">
            <Camera className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-600 text-gray-300 hover:text-white transition-all" title="View Options">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="flex-1 relative overflow-hidden">
        {/* Game Scene Background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: state.settings.backgroundColor }}
        >
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Game Objects */}
          {state.objects.map((obj) => (
            <div
              key={obj.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                state.selectedObject?.id === obj.id ? 'ring-2 ring-cyan-400 ring-opacity-75' : ''
              } ${state.isPlaying ? 'pointer-events-none' : ''}`}
              style={{
                left: `${400 + obj.position.x * 50}px`,
                top: `${300 - obj.position.y * 50}px`,
                transform: `
                  rotateX(${obj.rotation.x}deg) 
                  rotateY(${obj.rotation.y}deg) 
                  rotateZ(${obj.rotation.z}deg) 
                  scale(${obj.scale.x}, ${obj.scale.y})
                `,
                zIndex: Math.floor(obj.position.z * 10) + 100
              }}
              onClick={() => handleObjectClick(obj.id)}
              onMouseDown={(e) => {
                if (selectedTool === 'move') {
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startPos = { x: obj.position.x, y: obj.position.y };
                  
                  const handleMouseMove = (e: MouseEvent) => {
                    const deltaX = e.clientX - startX;
                    const deltaY = e.clientY - startY;
                    handleObjectDrag(obj.id, {
                      x: startPos.x * 50 + 400 + deltaX,
                      y: -startPos.y * 50 + 300 + deltaY
                    });
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }
              }}
            >
              <div
                className={`w-16 h-16 rounded-lg shadow-xl border-2 flex items-center justify-center hover:scale-110 transition-transform duration-200 ${
                  obj.type === 'player' ? 'border-green-400/50' :
                  obj.type === 'enemy' ? 'border-red-400/50' :
                  obj.type === 'collectible' ? 'border-yellow-400/50' :
                  'border-gray-400/50'
                }`}
                style={{
                  backgroundColor: obj.color,
                  opacity: obj.opacity / 100
                }}
              >
                <Box className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs text-center mt-1 text-gray-300 bg-black/50 rounded px-1">
                {obj.name}
              </div>
            </div>
          ))}
          
          {/* Play Mode Indicator */}
          {state.isPlaying && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg px-4 py-2">
              <div className="text-sm font-medium text-green-400 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>GAME RUNNING - Physics Active</span>
              </div>
            </div>
          )}
        </div>

        {/* Drop Zone Indicator */}
        {state.objects.length === 0 && (
          <div className="absolute inset-4 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Box className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-lg font-medium">Start Creating Your Game</p>
              <p className="text-gray-500 text-sm">Choose a template or add objects from the sidebar</p>
            </div>
          </div>
        )}

        {/* Viewport Controls */}
        <div className="absolute bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg p-2">
          <div className="text-xs text-gray-300 mb-2">Viewport</div>
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Objects: {state.objects.length}</div>
            <div className="text-xs text-gray-400">Mode: {state.viewMode}</div>
            <div className="text-xs text-gray-400">Tool: {selectedTool}</div>
          </div>
        </div>

        {/* Mode Indicator */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2">
          <div className="text-sm font-medium text-cyan-400">{state.viewMode} Editor Mode</div>
          <div className="text-xs text-gray-300">
            {state.isPlaying ? 'Game Running' : 'Ready for editing'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEditor;