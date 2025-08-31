use starknet::ContractAddress;

// Define the contract interface
#[starknet::interface]
pub trait ISnakeGame<TContractState> {
    fn make_move(ref self: TContractState, direction: felt252);
    fn get_score(self: @TContractState, player: ContractAddress) -> u256;
}

// Define the contract module
#[starknet::contract]
pub mod SnakeGame {
    use starknet::ContractAddress;
    use starknet::storage::*;
    use starknet::get_caller_address;

    // Define storage variables
    #[storage]
    pub struct Storage {
        // Mapping of player addresses to their current score
        player_scores: Map<ContractAddress, u256>,
    }

    // Define events
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        MoveMade: MoveMade,
    }

    #[derive(Drop, starknet::Event)]
    pub struct MoveMade {
        player: ContractAddress,
        direction: felt252,
        new_score: u256,
    }

    // Implement the contract interface
    #[abi(embed_v0)]
    pub impl SnakeGameImpl of super::ISnakeGame<ContractState> {
        // Make a move in the specified direction and increment score
        fn make_move(ref self: ContractState, direction: felt252) {
            let caller = get_caller_address();
            
            // Get current score (defaults to 0 if player doesn't exist)
            let current_score = self.player_scores.entry(caller).read();
            
            // Increment score by 1
            let new_score = current_score + 1;
            
            // Store the new score
            self.player_scores.entry(caller).write(new_score);
            
            // Emit the MoveMade event
            self.emit(Event::MoveMade(MoveMade {
                player: caller,
                direction,
                new_score,
            }));
        }

        // Get the score for a specific player
        fn get_score(self: @ContractState, player: ContractAddress) -> u256 {
            self.player_scores.entry(player).read()
        }
    }
}
