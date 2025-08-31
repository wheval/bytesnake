# Snake Game Smart Contract

A simple Cairo 1 smart contract for a Snake game on Starknet that tracks player scores and game moves.

## Features

- **Player Score Tracking**: Stores a mapping of player addresses to their current scores
- **Move System**: Players can make moves in different directions (0=up, 1=down, 2=left, 3=right)
- **Score Incrementation**: Each move increments the player's score by +1
- **Event Emission**: Emits `MoveMade` events for every move with player, direction, and new score
- **Score Retrieval**: Query any player's current score

## Contract Functions

### `make_move(direction: felt252)`
- **Purpose**: Records a player's move and increments their score
- **Parameters**: 
  - `direction`: Direction of the move (0=up, 1=down, 2=left, 3=right)
- **Effect**: Increments the caller's score by 1 and emits a `MoveMade` event
- **Access**: Public (anyone can call)

### `get_score(player: ContractAddress) -> u256`
- **Purpose**: Retrieves the current score for a specific player
- **Parameters**: 
  - `player`: The contract address of the player
- **Returns**: The player's current score (u256)
- **Access**: Public (view function)

## Events

### `MoveMade`
Emitted whenever a player makes a move:
- `player`: The address of the player who made the move
- `direction`: The direction of the move (0-3)
- `new_score`: The player's score after the move

## Direction Mapping

- `0` = Up
- `1` = Down  
- `2` = Left
- `3` = Right

## Usage Examples

### Making a Move
```cairo
// Player makes a move up
snake_game.make_move(0);

// Player makes a move right
snake_game.make_move(3);
```

### Getting a Score
```cairo
// Get your own score
let my_score = snake_game.get_score(my_address);

// Get another player's score
let other_score = snake_game.get_score(other_player_address);
```

## Development

### Prerequisites
- Cairo 2.11.4
- Starknet Foundry 0.44.0

### Building
```bash
scarb build
```

### Testing
```bash
scarb test
```

### Project Structure
```
contract/
├── Scarb.toml          # Project configuration
├── src/
│   └── lib.cairo       # Main contract code
├── tests/
│   └── test_snake_game.cairo  # Contract tests
└── README.md           # This file
```

## Contract Architecture

The contract uses:
- **Storage**: `Map<ContractAddress, u256>` for player scores
- **Events**: `MoveMade` event for move tracking
- **Interface**: `ISnakeGame` trait defining public functions
- **Implementation**: `SnakeGameImpl` implementing the interface

## Security Notes

- The contract is permissionless - anyone can call `make_move`
- Scores are stored as `u256` to handle large numbers
- No access control mechanisms are implemented
- The contract is minimal and focused on core functionality

## Future Enhancements

Potential improvements could include:
- Game state management (snake position, food, collisions)
- Multiplayer game sessions
- Score validation and anti-cheat mechanisms
- Game completion and reward systems
- Leaderboard functionality
