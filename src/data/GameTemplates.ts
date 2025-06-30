import { GameTemplate, GameObject } from '../types/GameTypes';

const createGameObject = (
  id: string,
  name: string,
  type: GameObject['type'],
  position: { x: number; y: number; z: number },
  color: string = '#ff4444'
): GameObject => ({
  id,
  name,
  type,
  position,
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  color,
  physics: {
    enabled: true,
    mass: 1,
    gravity: type === 'player' || type === 'enemy',
    kinematic: false
  },
  behaviors: type === 'player' ? ['jump', 'move', 'collect'] : [],
  animation: {
    current: 'idle',
    speed: 1
  },
  material: 'default',
  opacity: 100
});

export const gameTemplates: GameTemplate[] = [
  {
    id: 'shooting',
    name: 'Shooting Game',
    type: '3D',
    description: 'First-person shooter with enemies and weapons',
    objects: [
      createGameObject('player1', 'Player', 'player', { x: 0, y: 0, z: 0 }, '#00ff00'),
      createGameObject('enemy1', 'Enemy 1', 'enemy', { x: 5, y: 0, z: 0 }, '#ff0000'),
      createGameObject('enemy2', 'Enemy 2', 'enemy', { x: -5, y: 0, z: 0 }, '#ff0000'),
      createGameObject('platform1', 'Ground', 'platform', { x: 0, y: -2, z: 0 }, '#666666')
    ],
    settings: {
      gravity: 9.8,
      backgroundColor: '#001122',
      cameraPosition: { x: 0, y: 2, z: 8 }
    }
  },
  {
    id: 'running',
    name: 'Running Game',
    type: '2D/3D',
    description: 'Endless runner with obstacles and collectibles',
    objects: [
      createGameObject('player1', 'Runner', 'player', { x: -3, y: 0, z: 0 }, '#00ff00'),
      createGameObject('collectible1', 'Coin 1', 'collectible', { x: 2, y: 1, z: 0 }, '#ffff00'),
      createGameObject('collectible2', 'Coin 2', 'collectible', { x: 5, y: 2, z: 0 }, '#ffff00'),
      createGameObject('platform1', 'Ground', 'platform', { x: 0, y: -2, z: 0 }, '#666666'),
      createGameObject('platform2', 'Platform 1', 'platform', { x: 3, y: 0, z: 0 }, '#888888')
    ],
    settings: {
      gravity: 12,
      backgroundColor: '#87CEEB',
      cameraPosition: { x: 0, y: 2, z: 8 }
    }
  },
  {
    id: 'flying',
    name: 'Flying Game',
    type: '3D',
    description: 'Fly through obstacles and collect items',
    objects: [
      createGameObject('player1', 'Bird', 'player', { x: 0, y: 0, z: 0 }, '#00ffff'),
      createGameObject('collectible1', 'Star 1', 'collectible', { x: 3, y: 2, z: 0 }, '#ffff00'),
      createGameObject('collectible2', 'Star 2', 'collectible', { x: -2, y: -1, z: 0 }, '#ffff00'),
      createGameObject('enemy1', 'Obstacle', 'enemy', { x: 5, y: 0, z: 0 }, '#ff0000')
    ],
    settings: {
      gravity: 5,
      backgroundColor: '#87CEEB',
      cameraPosition: { x: 0, y: 0, z: 10 }
    }
  },
  {
    id: 'flappy',
    name: 'Flappy Bird',
    type: '2D',
    description: 'Classic flappy bird mechanics',
    objects: [
      createGameObject('player1', 'Bird', 'player', { x: -2, y: 0, z: 0 }, '#ffff00'),
      createGameObject('enemy1', 'Pipe Top', 'enemy', { x: 3, y: 3, z: 0 }, '#00ff00'),
      createGameObject('enemy2', 'Pipe Bottom', 'enemy', { x: 3, y: -3, z: 0 }, '#00ff00'),
      createGameObject('collectible1', 'Point', 'collectible', { x: 3, y: 0, z: 0 }, '#ffffff')
    ],
    settings: {
      gravity: 15,
      backgroundColor: '#87CEEB',
      cameraPosition: { x: 0, y: 0, z: 8 }
    }
  },
  {
    id: 'speedrunner',
    name: 'Speed Runner',
    type: '2D/3D',
    description: 'Fast-paced platformer with time challenges',
    objects: [
      createGameObject('player1', 'Speed Runner', 'player', { x: -4, y: 0, z: 0 }, '#ff00ff'),
      createGameObject('platform1', 'Start Platform', 'platform', { x: -4, y: -1, z: 0 }, '#666666'),
      createGameObject('platform2', 'Jump Platform', 'platform', { x: 0, y: 1, z: 0 }, '#888888'),
      createGameObject('platform3', 'End Platform', 'platform', { x: 4, y: 0, z: 0 }, '#666666'),
      createGameObject('collectible1', 'Speed Boost', 'collectible', { x: 0, y: 2, z: 0 }, '#00ffff')
    ],
    settings: {
      gravity: 10,
      backgroundColor: '#2a0845',
      cameraPosition: { x: 0, y: 2, z: 8 }
    }
  },
  {
    id: 'whackamole',
    name: 'Whack-the-Mole',
    type: '2D/3D',
    description: 'Click the moles as they pop up',
    objects: [
      createGameObject('enemy1', 'Mole 1', 'enemy', { x: -2, y: 0, z: 0 }, '#8B4513'),
      createGameObject('enemy2', 'Mole 2', 'enemy', { x: 0, y: 0, z: 0 }, '#8B4513'),
      createGameObject('enemy3', 'Mole 3', 'enemy', { x: 2, y: 0, z: 0 }, '#8B4513'),
      createGameObject('platform1', 'Ground', 'platform', { x: 0, y: -1, z: 0 }, '#228B22')
    ],
    settings: {
      gravity: 0,
      backgroundColor: '#228B22',
      cameraPosition: { x: 0, y: 2, z: 6 }
    }
  },
  {
    id: 'match3',
    name: 'Match-3',
    type: '2D',
    description: 'Match three or more gems in a row',
    objects: [
      createGameObject('collectible1', 'Red Gem', 'collectible', { x: -1, y: 1, z: 0 }, '#ff0000'),
      createGameObject('collectible2', 'Blue Gem', 'collectible', { x: 0, y: 1, z: 0 }, '#0000ff'),
      createGameObject('collectible3', 'Green Gem', 'collectible', { x: 1, y: 1, z: 0 }, '#00ff00'),
      createGameObject('collectible4', 'Red Gem 2', 'collectible', { x: -1, y: 0, z: 0 }, '#ff0000'),
      createGameObject('collectible5', 'Yellow Gem', 'collectible', { x: 0, y: 0, z: 0 }, '#ffff00'),
      createGameObject('collectible6', 'Purple Gem', 'collectible', { x: 1, y: 0, z: 0 }, '#ff00ff')
    ],
    settings: {
      gravity: 0,
      backgroundColor: '#4a0e4e',
      cameraPosition: { x: 0, y: 0, z: 5 }
    }
  },
  {
    id: 'crossyroad',
    name: 'Crossy Road',
    type: '3D',
    description: 'Cross the road avoiding cars',
    objects: [
      createGameObject('player1', 'Chicken', 'player', { x: 0, y: 0, z: -3 }, '#ffff00'),
      createGameObject('enemy1', 'Car 1', 'enemy', { x: -3, y: 0, z: 0 }, '#ff0000'),
      createGameObject('enemy2', 'Car 2', 'enemy', { x: 3, y: 0, z: 2 }, '#0000ff'),
      createGameObject('platform1', 'Road', 'platform', { x: 0, y: -0.5, z: 0 }, '#333333'),
      createGameObject('collectible1', 'Coin', 'collectible', { x: 0, y: 0, z: 3 }, '#ffff00')
    ],
    settings: {
      gravity: 9.8,
      backgroundColor: '#87CEEB',
      cameraPosition: { x: 0, y: 5, z: 5 }
    }
  }
];