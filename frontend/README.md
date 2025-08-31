# Snake Game Frontend

A beautiful and minimal Snake game frontend built with Next.js and Tailwind CSS, designed to work with the Starknet Snake game smart contract.

## Features

- 🐍 **Classic Snake Gameplay**: Move the snake, eat food, grow longer
- 🎮 **Smooth Controls**: Arrow keys or WASD support
- 🎨 **Modern UI**: Clean, dark theme with Tailwind CSS
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast Performance**: Optimized React components with hooks
- 🎯 **Score Tracking**: Real-time score display
- 🔄 **Game States**: Start screen, gameplay, and game over handling

## Game Controls

- **Start Game**: Press any arrow key or WASD
- **Movement**: Arrow keys or WASD keys
- **Restart**: Press Space bar after game over
- **Mobile**: Touch controls coming soon

## Game Rules

1. Control the snake to eat the red food
2. Each food eaten increases your score by 1
3. The snake grows longer with each food eaten
4. Avoid hitting the walls or your own tail
5. Game ends when collision occurs

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Build Tool**: Vite (via Next.js)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/             # React components
│   └── SnakeGame.tsx      # Main game component
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Customization

### Colors
Modify the custom colors in `tailwind.config.js`:
```javascript
colors: {
  'snake-green': '#10B981',
  'snake-dark': '#065F46',
  'food-red': '#EF4444',
  'bg-dark': '#1F2937',
}
```

### Game Settings
Adjust game parameters in `SnakeGame.tsx`:
```typescript
const GRID_SIZE = 20;        // Game grid size
const GAME_SPEED = 150;      // Game loop speed (ms)
```

### Styling
Modify the UI by editing the Tailwind classes in the components or updating the global CSS.

## Game Logic

The game uses a grid-based system where:
- Snake segments are stored as position arrays
- Food is randomly generated in valid positions
- Collision detection prevents invalid moves
- Game state manages different phases (start, playing, game over)

## Performance Optimizations

- **useCallback**: Prevents unnecessary re-renders
- **useEffect**: Manages side effects efficiently
- **State Updates**: Batched state updates for smooth gameplay
- **Event Listeners**: Proper cleanup to prevent memory leaks

## Future Enhancements

- [ ] Mobile touch controls
- [ ] Sound effects and music
- [ ] High score persistence
- [ ] Multiple difficulty levels
- [ ] Power-ups and special food
- [ ] Multiplayer support
- [ ] Integration with Starknet smart contract
- [ ] Leaderboard system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.
