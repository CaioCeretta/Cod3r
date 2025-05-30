import { Board, DiagonalChecker, PlayerType, VerticalChecker } from "../../src"

test('Should finish a game with Player X\'s victory - Diagonal 1', () => {
  const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(1, 1, PlayerType.X)
    .set(2, 2, PlayerType.X)
  const result = new VerticalChecker().check(board)
  expect(result.finished).toBeTruthy()
  expect(result.xWins).toBeTruthy()
  expect(result.oWins).toBeFalsy()
})

test('Should finish a game with Player X\'s victory - Diagonal 2', () => {
  const board = Board.empty()
    .set(2, 2, PlayerType.X)
    .set(1, 1, PlayerType.X)
    .set(0, 0, PlayerType.X)
  const result = new DiagonalChecker().check(board)
  expect(result.finished).toBeTruthy()
  expect(result.xWins).toBeTruthy()
  expect(result.oWins).toBeFalsy()
})

test('Should continue the game without a victory', () => {
    const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(1, 0, PlayerType.X)
    .set(2, 0, PlayerType.O)
    const result = new DiagonalChecker().check(board)
    expect(result.inProgress).toBeTruthy()
    expect(result.xWins).toBeFalsy()
    expect(result.oWins).toBeFalsy()

})