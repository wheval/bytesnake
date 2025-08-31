'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: string;
  gameOver: boolean;
  score: number;
  gameStarted: boolean;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 150;

const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    gameStarted: false,
  });

  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [gameState.snake]);

  // Check if position is valid
  const isValidPosition = useCallback((pos: Position): boolean => {
    return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE;
  }, []);

  // Check collision with snake body
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState.gameOver || !gameState.gameStarted) return;

    setGameState(prevState => {
      const newSnake = [...prevState.snake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (prevState.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (!isValidPosition(head)) {
        return { ...prevState, gameOver: true };
      }

      // Check self collision
      if (checkCollision(head, newSnake)) {
        return { ...prevState, gameOver: true };
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        // Snake ate food
        const newFood = generateFood();
        return {
          ...prevState,
          snake: newSnake,
          food: newFood,
          score: prevState.score + 1,
        };
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
        return {
          ...prevState,
          snake: newSnake,
        };
      }
    });
  }, [gameState.gameOver, gameState.gameStarted, gameState.direction, gameState.snake, gameState.food, gameState.score, isValidPosition, checkCollision, generateFood]);

  // Handle key presses
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameState.gameStarted) {
      startGame();
      return;
    }

    setGameState(prevState => {
      let newDirection = prevState.direction;
      
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (prevState.direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (prevState.direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (prevState.direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (prevState.direction !== 'LEFT') newDirection = 'RIGHT';
          break;
        case ' ':
          if (gameState.gameOver) resetGame();
          break;
      }

      return { ...prevState, direction: newDirection };
    });
  }, [gameState.gameStarted, gameState.direction, gameState.gameOver]);

  // Start game
  const startGame = useCallback(() => {
    setGameState(prevState => ({ ...prevState, gameStarted: true }));
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
      gameStarted: false,
    });
  }, []);

  // Set up game loop
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      const interval = setInterval(moveSnake, GAME_SPEED);
      setGameLoop(interval);
      return () => clearInterval(interval);
    }
  }, [gameState.gameStarted, gameState.gameOver, moveSnake]);

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Clean up game loop
  useEffect(() => {
    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [gameLoop]);

  // Render grid cell
  const renderCell = (x: number, y: number) => {
    const isSnake = gameState.snake.some(segment => segment.x === x && segment.y === y);
    const isHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y;
    const isFood = gameState.food.x === x && gameState.food.y === y;

    let cellClass = 'w-5 h-5 border border-gray-700';
    
    if (isSnake) {
      cellClass += isHead ? ' bg-snake-dark' : ' bg-snake-green';
    } else if (isFood) {
      cellClass += ' bg-food-red';
    } else {
      cellClass += ' bg-gray-800';
    }

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Snake Game</h1>
        <p className="text-gray-300 mb-4">Score: {gameState.score}</p>
        
        {!gameState.gameStarted && (
          <div className="space-y-4">
            <p className="text-gray-400">Press any arrow key or WASD to start</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Use arrow keys or WASD to control the snake</p>
              <p>Eat the red food to grow and increase your score</p>
              <p>Avoid hitting the walls or yourself!</p>
            </div>
          </div>
        )}

        {gameState.gameOver && (
          <div className="space-y-4">
            <p className="text-2xl font-bold text-red-400">Game Over!</p>
            <p className="text-gray-300">Final Score: {gameState.score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-snake-green text-white rounded-lg hover:bg-snake-dark transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-4 rounded-lg shadow-2xl">
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm text-gray-400 space-y-2">
          <p>Controls: Arrow Keys or WASD</p>
          <p>Press Space to restart after game over</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
