import { Board, PlayerType, VerticalChecker } from "../../src"

test('Should finish a game with Player X\'s victory', () => {
  const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(1, 0, PlayerType.X)
    .set(2, 0, PlayerType.X)
  const result = new VerticalChecker().check(board)
  expect(result.finished).toBeTruthy()
  expect(result.xWins).toBeTruthy()
  expect(result.oWins).toBeFalsy()
})

test('Should continue the game without a victory', () => {
    const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(1, 0, PlayerType.X)
    .set(2, 0, PlayerType.O)
    const result = new VerticalChecker().check(board)
    expect(result.inProgress).toBeTruthy()
    expect(result.xWins).toBeFalsy()
    expect(result.oWins).toBeFalsy()

})