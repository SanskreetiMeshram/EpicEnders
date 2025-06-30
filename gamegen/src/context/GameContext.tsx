import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameObject, GameTemplate } from '../types/GameTypes';
import { gameTemplates } from '../data/GameTemplates';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  addObject: (object: GameObject) => void;
  selectObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<GameObject>) => void;
  deleteObject: (id: string) => void;
  loadTemplate: (template: GameTemplate) => void;
  togglePlayMode: () => void;
  saveGame: () => void;
  exportGame: () => void;
}

type GameAction =
  | { type: 'ADD_OBJECT'; payload: GameObject }
  | { type: 'SELECT_OBJECT'; payload: string }
  | { type: 'UPDATE_OBJECT'; payload: { id: string; updates: Partial<GameObject> } }
  | { type: 'DELETE_OBJECT'; payload: string }
  | { type: 'LOAD_TEMPLATE'; payload: GameTemplate }
  | { type: 'TOGGLE_PLAY_MODE' }
  | { type: 'SET_VIEW_MODE'; payload: '2D' | '3D' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GameState['settings']> };

const initialState: GameState = {
  currentTemplate: null,
  selectedObject: null,
  isPlaying: false,
  viewMode: '3D',
  objects: [],
  settings: {
    gravity: 9.8,
    backgroundColor: '#000000',
    cameraPosition: { x: 0, y: 5, z: 10 }
  }
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_OBJECT':
      return {
        ...state,
        objects: [...state.objects, action.payload]
      };
    case 'SELECT_OBJECT':
      return {
        ...state,
        selectedObject: state.objects.find(obj => obj.id === action.payload) || null
      };
    case 'UPDATE_OBJECT':
      return {
        ...state,
        objects: state.objects.map(obj =>
          obj.id === action.payload.id ? { ...obj, ...action.payload.updates } : obj
        ),
        selectedObject: state.selectedObject?.id === action.payload.id
          ? { ...state.selectedObject, ...action.payload.updates }
          : state.selectedObject
      };
    case 'DELETE_OBJECT':
      return {
        ...state,
        objects: state.objects.filter(obj => obj.id !== action.payload),
        selectedObject: state.selectedObject?.id === action.payload ? null : state.selectedObject
      };
    case 'LOAD_TEMPLATE':
      return {
        ...state,
        currentTemplate: action.payload,
        objects: [...action.payload.objects],
        settings: { ...action.payload.settings }
      };
    case 'TOGGLE_PLAY_MODE':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addObject = (object: GameObject) => {
    dispatch({ type: 'ADD_OBJECT', payload: object });
  };

  const selectObject = (id: string) => {
    dispatch({ type: 'SELECT_OBJECT', payload: id });
  };

  const updateObject = (id: string, updates: Partial<GameObject>) => {
    dispatch({ type: 'UPDATE_OBJECT', payload: { id, updates } });
  };

  const deleteObject = (id: string) => {
    dispatch({ type: 'DELETE_OBJECT', payload: id });
  };

  const loadTemplate = (template: GameTemplate) => {
    dispatch({ type: 'LOAD_TEMPLATE', payload: template });
  };

  const togglePlayMode = () => {
    dispatch({ type: 'TOGGLE_PLAY_MODE' });
  };

  const saveGame = () => {
    const gameData = {
      objects: state.objects,
      settings: state.settings,
      template: state.currentTemplate,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('epicenders_game', JSON.stringify(gameData));
    alert('Game saved successfully!');
  };

  const exportGame = () => {
    const gameData = {
      objects: state.objects,
      settings: state.settings,
      template: state.currentTemplate,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epicenders_game_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      addObject,
      selectObject,
      updateObject,
      deleteObject,
      loadTemplate,
      togglePlayMode,
      saveGame,
      exportGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};