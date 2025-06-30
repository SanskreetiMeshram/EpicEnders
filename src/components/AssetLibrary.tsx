import React, { useState } from 'react';
import { 
  Package,
  Image,
  Volume2,
  Box,
  Zap,
  Search,
  Filter,
  Upload,
  Star,
  Download
} from 'lucide-react';

const AssetLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('models');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'models', label: '3D Models', icon: Box, count: 156 },
    { id: 'textures', label: 'Textures', icon: Image, count: 245 },
    { id: 'audio', label: 'Audio', icon: Volume2, count: 89 },
    { id: 'animations', label: 'Animations', icon: Zap, count: 67 },
  ];

  const assets = {
    models: [
      { name: 'Character_Robot', type: 'FBX', size: '2.4MB', rating: 4.8 },
      { name: 'Environment_City', type: 'OBJ', size: '15.2MB', rating: 4.9 },
      { name: 'Vehicle_Sports_Car', type: 'FBX', size: '5.1MB', rating: 4.7 },
      { name: 'Weapon_Sword', type: 'FBX', size: '1.8MB', rating: 4.6 },
      { name: 'Building_Skyscraper', type: 'OBJ', size: '12.5MB', rating: 4.8 },
      { name: 'Collectible_Gem', type: 'FBX', size: '0.9MB', rating: 4.9 }
    ],
    textures: [
      { name: 'Metal_Brushed', type: 'PNG', size: '4.2MB', rating: 4.7 },
      { name: 'Wood_Oak', type: 'PNG', size: '3.8MB', rating: 4.8 },
      { name: 'Concrete_Rough', type: 'PNG', size: '5.1MB', rating: 4.6 },
      { name: 'Fabric_Denim', type: 'PNG', size: '2.9MB', rating: 4.5 },
      { name: 'Stone_Marble', type: 'PNG', size: '6.3MB', rating: 4.9 },
      { name: 'Glass_Clear', type: 'PNG', size: '1.7MB', rating: 4.4 }
    ],
    audio: [
      { name: 'Jump_Sound', type: 'WAV', size: '256KB', rating: 4.8 },
      { name: 'Background_Music_Epic', type: 'MP3', size: '8.4MB', rating: 4.9 },
      { name: 'Explosion_Big', type: 'WAV', size: '512KB', rating: 4.7 },
      { name: 'Footsteps_Metal', type: 'WAV', size: '128KB', rating: 4.6 },
      { name: 'Ambient_Forest', type: 'MP3', size: '12.1MB', rating: 4.8 },
      { name: 'UI_Click', type: 'WAV', size: '64KB', rating: 4.5 }
    ],
    animations: [
      { name: 'Character_Walk_Cycle', type: 'FBX', size: '1.2MB', rating: 4.9 },
      { name: 'Attack_Combo', type: 'FBX', size: '2.1MB', rating: 4.8 },
      { name: 'Idle_Breathing', type: 'FBX', size: '0.8MB', rating: 4.7 },
      { name: 'Jump_Sequence', type: 'FBX', size: '1.5MB', rating: 4.6 },
      { name: 'Death_Animation', type: 'FBX', size: '1.8MB', rating: 4.8 },
      { name: 'Victory_Pose', type: 'FBX', size: '1.1MB', rating: 4.5 }
    ]
  };

  return (
    <div className="h-64 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800 flex flex-col">
      {/* Header */}
      <div className="h-12 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white">Asset Library</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-3 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none w-48"
            />
          </div>
          <button className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors" title="Filter">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors" title="Upload Asset">
            <Upload className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Category Tabs */}
        <div className="w-48 bg-gray-800/50 border-r border-gray-700 p-2">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400'
                    : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asset Grid */}
        <div className="flex-1 p-4 overflow-x-auto">
          <div className="flex space-x-3 h-full">
            {assets[activeCategory as keyof typeof assets]?.map((asset, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-3 hover:border-gray-600 transition-all duration-200 cursor-pointer group hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {/* Asset Preview */}
                <div className="w-full h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mb-2 flex items-center justify-center">
                  {activeCategory === 'models' && <Box className="w-8 h-8 text-gray-300" />}
                  {activeCategory === 'textures' && <Image className="w-8 h-8 text-gray-300" />}
                  {activeCategory === 'audio' && <Volume2 className="w-8 h-8 text-gray-300" />}
                  {activeCategory === 'animations' && <Zap className="w-8 h-8 text-gray-300" />}
                </div>
                
                {/* Asset Info */}
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                    {asset.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{asset.type}</span>
                    <span className="text-xs text-gray-500">{asset.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-400">{asset.rating}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded" title="Download">
                      <Download className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;