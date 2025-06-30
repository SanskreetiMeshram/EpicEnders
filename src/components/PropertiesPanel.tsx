import React, { useState } from 'react';
import { 
  Settings,
  Sliders,
  Palette,
  Zap,
  Move,
  RotateCcw,
  Scale,
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';

const PropertiesPanel: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['transform', 'appearance', 'behavior'])
  );
  const { state, updateObject } = useGame();

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePropertyChange = (property: string, value: any) => {
    if (state.selectedObject) {
      updateObject(state.selectedObject.id, { [property]: value });
    }
  };

  const handleNestedPropertyChange = (parent: string, property: string, value: any) => {
    if (state.selectedObject) {
      updateObject(state.selectedObject.id, {
        [parent]: {
          ...state.selectedObject[parent as keyof typeof state.selectedObject],
          [property]: value
        }
      });
    }
  };

  const PropertySection: React.FC<{
    title: string;
    icon: React.ElementType;
    id: string;
    children: React.ReactNode;
  }> = ({ title, icon: Icon, id, children }) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-cyan-400" />
            <span className="font-medium text-white">{title}</span>
          </div>
          {isExpanded ? 
            <ChevronDown className="w-4 h-4 text-gray-400" /> : 
            <ChevronRight className="w-4 h-4 text-gray-400" />
          }
        </button>
        {isExpanded && (
          <div className="p-3 bg-gray-900/30 border-t border-gray-700">
            {children}
          </div>
        )}
      </div>
    );
  };

  if (!state.selectedObject) {
    return (
      <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 flex flex-col">
        <div className="h-12 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 flex items-center px-4">
          <Settings className="w-5 h-5 text-cyan-400 mr-2" />
          <h3 className="font-semibold text-white">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select an object to edit properties</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 flex flex-col">
      {/* Header */}
      <div className="h-12 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 flex items-center px-4">
        <Settings className="w-5 h-5 text-cyan-400 mr-2" />
        <h3 className="font-semibold text-white">Properties</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Object Info */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: state.selectedObject.color }}
            >
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <input
                type="text"
                value={state.selectedObject.name}
                onChange={(e) => handlePropertyChange('name', e.target.value)}
                className="font-medium text-white bg-transparent border-none outline-none"
              />
              <p className="text-xs text-gray-400">{state.selectedObject.type} Object</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">ID: {state.selectedObject.id}</div>
        </div>

        {/* Transform Properties */}
        <PropertySection title="Transform" icon={Move} id="transform">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
              <div className="grid grid-cols-3 gap-2">
                <input 
                  type="number" 
                  placeholder="X" 
                  value={state.selectedObject.position.x}
                  onChange={(e) => handleNestedPropertyChange('position', 'x', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
                <input 
                  type="number" 
                  placeholder="Y" 
                  value={state.selectedObject.position.y}
                  onChange={(e) => handleNestedPropertyChange('position', 'y', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
                <input 
                  type="number" 
                  placeholder="Z" 
                  value={state.selectedObject.position.z}
                  onChange={(e) => handleNestedPropertyChange('position', 'z', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Rotation</label>
              <div className="grid grid-cols-3 gap-2">
                <input 
                  type="number" 
                  placeholder="X" 
                  value={state.selectedObject.rotation.x}
                  onChange={(e) => handleNestedPropertyChange('rotation', 'x', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
                <input 
                  type="number" 
                  placeholder="Y" 
                  value={state.selectedObject.rotation.y}
                  onChange={(e) => handleNestedPropertyChange('rotation', 'y', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
                <input 
                  type="number" 
                  placeholder="Z" 
                  value={state.selectedObject.rotation.z}
                  onChange={(e) => handleNestedPropertyChange('rotation', 'z', parseFloat(e.target.value) || 0)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Scale</label>
              <div className="grid grid-cols-3 gap-2">
                <input 
                  type="number" 
                  placeholder="X" 
                  value={state.selectedObject.scale.x}
                  onChange={(e) => handleNestedPropertyChange('scale', 'x', parseFloat(e.target.value) || 1)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
                <input 
                  type="number" 
                  placeholder="Y" 
                  value={state.selectedObject.scale.y}
                  onChange={(e) => handleNestedPropertyChange('scale', 'y', parseFloat(e.target.value) || 1)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
                <input 
                  type="number" 
                  placeholder="Z" 
                  value={state.selectedObject.scale.z}
                  onChange={(e) => handleNestedPropertyChange('scale', 'z', parseFloat(e.target.value) || 1)}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </PropertySection>

        {/* Appearance Properties */}
        <PropertySection title="Appearance" icon={Palette} id="appearance">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Material</label>
              <select 
                value={state.selectedObject.material}
                onChange={(e) => handlePropertyChange('material', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="wood">Wood</option>
                <option value="plastic">Plastic</option>
                <option value="ai_generated">AI Generated</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
              <div className="flex space-x-2">
                <input 
                  type="color" 
                  value={state.selectedObject.color}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                  className="w-12 h-8 bg-gray-800 border border-gray-600 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={state.selectedObject.color}
                  onChange={(e) => handlePropertyChange('color', e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Opacity: {state.selectedObject.opacity}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={state.selectedObject.opacity}
                onChange={(e) => handlePropertyChange('opacity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </PropertySection>

        {/* Behavior Properties */}
        <PropertySection title="Behavior" icon={Zap} id="behavior">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Physics</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={state.selectedObject.physics.enabled}
                    onChange={(e) => handleNestedPropertyChange('physics', 'enabled', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-400" 
                  />
                  <span className="text-sm text-gray-300">Enable Physics</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={state.selectedObject.physics.kinematic}
                    onChange={(e) => handleNestedPropertyChange('physics', 'kinematic', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-400" 
                  />
                  <span className="text-sm text-gray-300">Is Kinematic</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={state.selectedObject.physics.gravity}
                    onChange={(e) => handleNestedPropertyChange('physics', 'gravity', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-400" 
                  />
                  <span className="text-sm text-gray-300">Use Gravity</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mass</label>
              <input 
                type="number" 
                value={state.selectedObject.physics.mass}
                onChange={(e) => handleNestedPropertyChange('physics', 'mass', parseFloat(e.target.value) || 1)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Behaviors</label>
              <div className="space-y-2">
                {['Jump', 'Run', 'Attack', 'Collect Items', 'Health System', 'AI Behavior'].map((behavior, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newBehaviors = state.selectedObject!.behaviors.includes(behavior.toLowerCase().replace(' ', '_'))
                        ? state.selectedObject!.behaviors.filter(b => b !== behavior.toLowerCase().replace(' ', '_'))
                        : [...state.selectedObject!.behaviors, behavior.toLowerCase().replace(' ', '_')];
                      handlePropertyChange('behaviors', newBehaviors);
                    }}
                    className={`w-full text-left p-2 border rounded text-sm transition-colors ${
                      state.selectedObject.behaviors.includes(behavior.toLowerCase().replace(' ', '_'))
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-gray-300 hover:text-white'
                    }`}
                  >
                    {state.selectedObject.behaviors.includes(behavior.toLowerCase().replace(' ', '_')) ? '✓ ' : '+ '}
                    {behavior}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PropertySection>

        {/* Animation Properties */}
        <PropertySection title="Animation" icon={Eye} id="animation">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Current Animation</label>
              <select 
                value={state.selectedObject.animation.current}
                onChange={(e) => handleNestedPropertyChange('animation', 'current', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="idle">Idle</option>
                <option value="walk">Walk</option>
                <option value="run">Run</option>
                <option value="jump">Jump</option>
                <option value="attack">Attack</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Animation Speed: {state.selectedObject.animation.speed}x</label>
              <input 
                type="range" 
                min="0.1" 
                max="3" 
                step="0.1"
                value={state.selectedObject.animation.speed}
                onChange={(e) => handleNestedPropertyChange('animation', 'speed', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200">
              Create Animation with AI
            </button>
          </div>
        </PropertySection>
      </div>
    </div>
  );
};

export default PropertiesPanel;