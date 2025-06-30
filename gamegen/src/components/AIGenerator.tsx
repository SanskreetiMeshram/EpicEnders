import React, { useState } from 'react';
import { Zap, Wand2, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { GameObject } from '../types/GameTypes';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addObject } = useGame();

  const generateAICharacter = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate character based on prompt
    const aiCharacter: GameObject = {
      id: `ai_${Date.now()}`,
      name: `AI ${prompt}`,
      type: 'player',
      position: { x: Math.random() * 4 - 2, y: 0, z: Math.random() * 4 - 2 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      physics: {
        enabled: true,
        mass: 1,
        gravity: true,
        kinematic: false
      },
      behaviors: ['move', 'jump', 'ai_behavior'],
      animation: {
        current: 'idle',
        speed: 1
      },
      material: 'ai_generated',
      opacity: 100
    };
    
    addObject(aiCharacter);
    setPrompt('');
    setIsGenerating(false);
    
    alert(`AI Character "${prompt}" generated successfully!`);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Zap className="w-5 h-5 text-purple-400" />
        <h4 className="font-medium text-purple-400">AI Character Generator</h4>
      </div>
      
      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your character... (e.g., 'A brave knight with golden armor' or 'A cute robot with blue eyes')"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm text-white focus:border-purple-400 focus:outline-none resize-none h-20"
        />
        
        <button
          onClick={generateAICharacter}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 py-2 px-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Character</span>
            </>
          )}
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-400">
        AI will create a unique character with custom behaviors, animations, and properties based on your description.
      </div>
    </div>
  );
};

export default AIGenerator;