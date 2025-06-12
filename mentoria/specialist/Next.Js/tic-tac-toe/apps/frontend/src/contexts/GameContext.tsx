"use client";

import { Game, GameResult, Player, PlayerType, type Board } from "core";
import { createContext, useState } from "react";

interface GameContextProps {
  player1: Player;
  player2: Player;
  ties: number;
  board: Board;
  result: GameResult;
  currentPlayer: Player;
  addMove: (row: number, col: number) => void;
  restart: () => void;
  clear: () => void;
}

export const GameContext = createContext<GameContextProps>({} as any);

export function GameProvider(props: any) {
  const [game, setGame] = useState<Game>(
    Game.create(
      new Player("You", PlayerType.X),
      new Player("CPU", PlayerType.O)
    )
  );

  function addMove(row: number, col: number) {
    /* we have this function defined in core for adding a move to the board and we are going to get what is returned 
    by the function and update the state with the new generated state

    because since all the defined classes are immutable — all the attributes are readonly — but whenever we use some rich
    behavior, such as a new move, it will run the logic and generate a new instance with the new updated move. 
    */

    setGame(game.addMove(row, col));
  }

  function restart() {
    setGame(game.nextRound());
  }

  function clear() {
    setGame(game.clear());
  }

  return (
    <GameContext.Provider
      value={{
        ties: game.ties,
        player1: game.player1,
        player2: game.player2,
        addMove,
        board: game.board,
        result: game.result,
        currentPlayer: game.currentPlayer,
        restart,
        clear,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
}
