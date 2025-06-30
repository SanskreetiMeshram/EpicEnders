import React, { useState } from 'react';
import { 
  Layers, 
  Box, 
  Image, 
  Volume2, 
  Palette, 
  Zap, 
  Target,
  ChevronRight,
  ChevronDown,
  Play
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { gameTemplates } from '../data/GameTemplates';
import AIGenerator from './AIGenerator';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['templates']));
  const { loadTemplate, addObject } = useGame();

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleTemplateClick = (template: any) => {
    loadTemplate(template);
    alert(`${template.name} template loaded! Click Play Test to try it.`);
  };

  const createNewObject = (type: 'player' | 'enemy' | 'collectible' | 'platform') => {
    const newObject = {
      id: `${type}_${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      position: { x: Math.random() * 4 - 2, y: 0, z: Math.random() * 4 - 2 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      color: type === 'player' ? '#00ff00' : type === 'enemy' ? '#ff0000' : type === 'collectible' ? '#ffff00' : '#666666',
      physics: {
        enabled: true,
        mass: 1,
        gravity: type === 'player' || type === 'enemy',
        kinematic: false
      },
      behaviors: type === 'player' ? ['move', 'jump'] : [],
      animation: {
        current: 'idle',
        speed: 1
      },
      material: 'default',
      opacity: 100
    };
    
    addObject(newObject);
    alert(`${newObject.name} added to scene!`);
  };

  const gameObjects = [
    { name: 'Player Character', icon: Target, type: 'player' as const },
    { name: 'Enemy', icon: Box, type: 'enemy' as const },
    { name: 'Collectible', icon: Zap, type: 'collectible' as const },
    { name: 'Platform', icon: Layers, type: 'platform' as const },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        {[
          { id: 'templates', label: 'Templates', icon: Layers },
          { id: 'objects', label: 'Objects', icon: Box },
          { id: 'assets', label: 'Assets', icon: Image }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b-2 border-cyan-400 text-cyan-400'
                : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'templates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Game Templates</h3>
              <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">{gameTemplates.length} Templates</span>
            </div>
            
            <div className="grid gap-3">
              {gameTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10"
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{template.type}</p>
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'objects' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Game Objects</h3>
            </div>
            
            <div className="space-y-2">
              {gameObjects.map((obj, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-200 cursor-pointer group"
                  onClick={() => createNewObject(obj.type)}
                >
                  <div className="flex items-center space-x-3">
                    <obj.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-white group-hover:text-cyan-400 transition-colors">{obj.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <AIGenerator />
          </div>
        )}

        {activeTab === 'assets' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Asset Library</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Textures', icon: Palette, count: 245 },
                { name: 'Audio', icon: Volume2, count: 89 },
                { name: 'Models', icon: Box, count: 156 },
                { name: 'Animations', icon: Zap, count: 67 }
              ].map((category, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleSection(category.name.toLowerCase())}
                    className="w-full flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{category.count}</span>
                      {expandedSections.has(category.name.toLowerCase()) ? 
                        <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.has(category.name.toLowerCase()) && (
                    <div className="mt-2 ml-4 space-y-1">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="p-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                          {category.name} Item {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;