
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainEditor from './components/MainEditor';
import PropertiesPanel from './components/PropertiesPanel';
import AssetLibrary from './components/AssetLibrary';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameProvider>
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
          {/* Header */}
          <Header />
          
          {/* Main Layout */}
          <div className="flex h-[calc(100vh-64px)]">
            {/* Left Sidebar */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Main Editor */}
              <div className="flex-1 flex">
                <MainEditor />
                <PropertiesPanel />
              </div>
              
              {/* Bottom Asset Library */}
              <AssetLibrary />
            </div>
          </div>
        </div>
      </GameProvider>
    </DndProvider>
  );
}

export default App;