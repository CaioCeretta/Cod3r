import { Board, PlayerType, VerticalChecker } from "../../src"

test('Should finish a game with Player O\'s victory', () => {
  const board = Board.empty()
    .set(0, 1, PlayerType.O)
    .set(1, 1, PlayerType.O)
    .set(2, 1, PlayerType.O)
  const result = new VerticalChecker().check(board)
  expect(result.finished).toBeTruthy()
  expect(result.oWins).toBeTruthy()
  expect(result.xWins).toBeFalsy()
})