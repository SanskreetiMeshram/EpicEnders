export interface GameObject {
    id: string;
    name: string;
    type: 'player' | 'enemy' | 'collectible' | 'platform' | 'background';
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
    color: string;
    physics: {
     s: number;
      gravity: boolean;
      kinematic: boolean;
    };
    behaviors: stri enabled: boolean;
      masng[];
    animation: {
      current: string;
      speed: number;
    };
    material: string;
    opacity: number;
  }
  
  export interface GameTemplate {
    id: string;
    name: string;
    type: '2D' | '3D' | '2D/3D';
    description: string;
    objects: GameObject[];
    settings: {
      gravity: number;
      backgroundColor: string;
      cameraPosition: { x: number; y: number; z: number };
    };
  }
  
  export interface GameState {
    currentTemplate: GameTemplate | null;
    selectedObject: GameObject | null;
    isPlaying: boolean;
    viewMode: '2D' | '3D';
    objects: GameObject[];
    settings: {
      gravity: number;
      backgroundColor: string;
      cameraPosition: { x: number; y: number; z: number };
    };
  }