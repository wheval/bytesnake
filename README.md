# ByteSnake - Starknet Snake Game

A complete Snake game implementation featuring a Cairo 1 smart contract on Starknet and a beautiful Next.js frontend.

## 🏗️ Project Structure

```
bytesnake/
├── contract/                 # Cairo smart contract
│   ├── src/
│   │   └── lib.cairo        # Main contract code
│   ├── tests/
│   │   └── test_snake_game.cairo
│   ├── Scarb.toml           # Cairo project config
│   └── README.md            # Contract documentation
├── frontend/                 # Next.js game frontend
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   │   └── SnakeGame.tsx    # Main game component
│   ├── package.json          # Node.js dependencies
│   └── README.md            # Frontend documentation
└── README.md                # This file
```

## 🎮 Game Features

- **Classic Snake Gameplay**: Move, eat, grow, avoid collisions
- **Blockchain Integration**: Score tracking on Starknet
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Smart Contract**: Cairo 1 contract for on-chain score management
- **Event System**: Blockchain events for game moves and scores

## 🚀 Quick Start

### Smart Contract (Cairo)

1. Navigate to the contract directory:
```bash
cd contract
```

2. Install Scarb (Cairo package manager):
```bash
# On Windows
winget install Scarb.Scarb

# On macOS/Linux
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

3. Build and test the contract:
```bash
scarb build
scarb test
```

### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Start**: Press any arrow key or WASD to begin
2. **Control**: Use arrow keys or WASD to move the snake
3. **Objective**: Eat the red food to grow and increase your score
4. **Avoid**: Don't hit the walls or your own tail
5. **Restart**: Press Space bar after game over

## 🔧 Smart Contract Functions

### `make_move(direction: felt252)`
- Records a player's move and increments their score
- Direction values: 0=up, 1=down, 2=left, 3=right
- Emits `MoveMade` event with player, direction, and new score

### `get_score(player: ContractAddress) -> u256`
- Returns the current score for a specific player
- View function that doesn't modify state

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Optimized game loop and rendering
- **Modern UI**: Dark theme with custom color scheme
- **Performance**: Optimized React components with hooks
- **Accessibility**: Keyboard controls and clear visual feedback

## 🛠️ Technology Stack

### Backend (Starknet)
- **Language**: Cairo 1
- **Framework**: Starknet
- **Testing**: Starknet Foundry
- **Package Manager**: Scarb

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Build Tool**: Vite (via Next.js)

## 🔗 Integration

The frontend is designed to integrate with the Cairo smart contract:

1. **Score Tracking**: Game scores can be sent to the blockchain
2. **Event Listening**: Frontend can listen to `MoveMade` events
3. **Player Management**: Contract stores player addresses and scores
4. **On-chain Gameplay**: Future versions can implement on-chain game logic

## 🚧 Future Enhancements

### Smart Contract
- [ ] Game state management on-chain
- [ ] Multiplayer game sessions
- [ ] Score validation and anti-cheat
- [ ] Game completion rewards
- [ ] Leaderboard functionality

### Frontend
- [ ] Mobile touch controls
- [ ] Sound effects and music
- [ ] High score persistence
- [ ] Multiple difficulty levels
- [ ] Power-ups and special food
- [ ] Real-time blockchain integration

## 📚 Documentation

- [Contract Documentation](./contract/README.md) - Smart contract details
- [Frontend Documentation](./frontend/README.md) - UI/UX implementation
- [Cairo Documentation](https://docs.starknet.io/documentation/architecture_and_concepts/) - Starknet development
- [Next.js Documentation](https://nextjs.org/docs) - React framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (both contract and frontend)
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

- **Contract Issues**: Check the contract README and Cairo documentation
- **Frontend Issues**: Check the frontend README and Next.js documentation
- **General Questions**: Open an issue on the repository

## 🎉 Acknowledgments

- **Starknet Team**: For the amazing Cairo language and Starknet platform
- **Next.js Team**: For the excellent React framework
- **Tailwind CSS**: For the beautiful utility-first CSS framework
- **Open Source Community**: For inspiration and collaboration

---

**Happy Gaming! 🐍⚡**
