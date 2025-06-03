import type Player from "../player/Player";
import GameResult from "../result/GameResult";
import Board from "./Board";

export default class Game {
  private constructor(
      readonly player1: Player,
      readonly player2: Player,
      readonly board: Board,
      readonly firstPlayer: Player,
      readonly currentPlayer: Player,
      readonly result: GameResult = new GameResult()
  ) {}

  static create(player1: Player, player2: Player): Game {
    return new Game(player1, player2, Board.empty(), player1, player2)
  }
}