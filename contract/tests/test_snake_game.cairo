use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, load, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address,
};
use starknet::storage::StoragePointerReadAccess;
use starknet::{ContractAddress, contract_address_const};

use snake_game::snake_game::SnakeGame::{Event as SnakeGameEvents, MoveMade};
use snake_game::snake_game::SnakeGame::{InternalTrait};
use snake_game::{ISnakeGameDispatcher, ISnakeGameDispatcherTrait, SnakeGame};

fn player1() -> ContractAddress {
    contract_address_const::<'player1'>()
}

fn player2() -> ContractAddress {
    contract_address_const::<'player2'>()
}

fn deploy_snake_game() -> (ISnakeGameDispatcher, ContractAddress) {
    let contract = declare("SnakeGame").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();
    let dispatcher = ISnakeGameDispatcher { contract_address };
    (dispatcher, contract_address)
}

#[test]
fn test_make_move_increments_score() {
    // Setup
    let (snake_game, snake_game_address) = deploy_snake_game();
    start_cheat_caller_address(snake_game_address, player1());
    let mut spy = spy_events();

    // When - make a move
    snake_game.make_move(0); // Up direction

    // Then - score should be 1
    assert_eq!(snake_game.get_score(player1()), 1);
    
    // Verify event was emitted
    let expected_event = SnakeGameEvents::MoveMade(MoveMade {
        player: player1(),
        direction: 0,
        new_score: 1,
    });
    spy.assert_emitted(@array![(snake_game_address, expected_event)]);
}

#[test]
fn test_multiple_moves_accumulate_score() {
    // Setup
    let (snake_game, snake_game_address) = deploy_snake_game();
    start_cheat_caller_address(snake_game_address, player1());

    // When - make multiple moves
    snake_game.make_move(1); // Down direction
    snake_game.make_move(2); // Left direction
    snake_game.make_move(3); // Right direction

    // Then - score should be 3
    assert_eq!(snake_game.get_score(player1()), 3);
}

#[test]
fn test_different_players_have_separate_scores() {
    // Setup
    let (snake_game, snake_game_address) = deploy_snake_game();
    
    // Player 1 makes moves
    start_cheat_caller_address(snake_game_address, player1());
    snake_game.make_move(0);
    snake_game.make_move(1);
    
    // Player 2 makes moves
    start_cheat_caller_address(snake_game_address, player2());
    snake_game.make_move(2);
    
    // Then - scores should be separate
    assert_eq!(snake_game.get_score(player1()), 2);
    assert_eq!(snake_game.get_score(player2()), 1);
}

#[test]
fn test_get_score_for_new_player_returns_zero() {
    // Setup
    let (snake_game, _) = deploy_snake_game();
    
    // When - get score for a player who hasn't played
    let score = snake_game.get_score(player2());
    
    // Then - score should be 0
    assert_eq!(score, 0);
}

#[test]
fn test_direction_values() {
    // Setup
    let (snake_game, snake_game_address) = deploy_snake_game();
    start_cheat_caller_address(snake_game_address, player1());
    let mut spy = spy_events();

    // Test different direction values
    snake_game.make_move(0); // Up
    snake_game.make_move(1); // Down
    snake_game.make_move(2); // Left
    snake_game.make_move(3); // Right
    
    // Then - score should be 4
    assert_eq!(snake_game.get_score(player1()), 4);
    
    // Verify events were emitted for each direction
    let events = spy.events();
    assert_eq!(events.len(), 4);
}
