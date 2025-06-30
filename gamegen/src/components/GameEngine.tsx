import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { GameObject } from '../types/GameTypes';

interface GameEngineProps {
  isPlaying: boolean;
}

const GameEngine: React.FC<GameEngineProps> = ({ isPlaying }) => {
  const { state } = useGame();
  const animationFrameRef = useRef<number>();
  const gameStateRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (isPlaying) {
      startGameLoop();
    } else {
      stopGameLoop();
    }

    return () => stopGameLoop();
  }, [isPlaying, state.objects]);

  const startGameLoop = () => {
    const gameLoop = () => {
      updateGameLogic();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  };

  const stopGameLoop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const updateGameLogic = () => {
    // Simple physics and game logic
    state.objects.forEach((obj: GameObject) => {
      if (obj.physics.enabled && obj.physics.gravity && obj.type === 'player') {
        // Apply gravity
        if (!gameStateRef.current[obj.id]) {
          gameStateRef.current[obj.id] = { velocity: { x: 0, y: 0, z: 0 } };
        }
        
        const objState = gameStateRef.current[obj.id];
        objState.velocity.y -= state.settings.gravity * 0.016; // 60fps
        
        // Update position based on velocity
        obj.position.y += objState.velocity.y * 0.016;
        
        // Ground collision (simple)
        if (obj.position.y < 0) {
          obj.position.y = 0;
          objState.velocity.y = 0;
        }
      }
    });
  };

  return null; // This component handles game logic, no visual rendering
};

export default GameEngine;