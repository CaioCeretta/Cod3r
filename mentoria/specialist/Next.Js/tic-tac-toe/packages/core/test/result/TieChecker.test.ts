import { Board, PlayerType } from "../../src"
import TieChecker from "../../src/result/TieChecker"

test('Should finish the game with a tie', () => {
  const board = Board.empty()
    .set(0, 0, PlayerType.O)
    .set(0, 1, PlayerType.X)
    .set(0, 2, PlayerType.O)
    .set(1, 0, PlayerType.O)
    .set(1, 1, PlayerType.X)
    .set(1, 2, PlayerType.O)
    .set(2, 0, PlayerType.X)
    .set(2, 1, PlayerType.O)
    .set(2, 2, PlayerType.X)

  const result = new TieChecker().check(board)

  expect(result.finished).toBeTruthy()
  expect(result.xWins).toBeFalsy()
  expect(result.oWins).toBeFalsy()
  expect(result.tied).toBeTruthy()

})

test('Should return game in progress', () => {
    const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(1, 1, PlayerType.O)
    .set(0, 2, PlayerType.O)

    const result = new TieChecker().check(board)

    expect(result.finished).toBeFalsy()
    expect(result.xWins).toBeFalsy()
    expect(result.oWins).toBeFalsy()
    expect(result.tied).toBeFalsy()

})