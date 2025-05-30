import { Board, HorizontalChecker, PlayerType } from "../../src"

test('Should finish a game with Player X\'s victory', () => {
  const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(0, 1, PlayerType.X)
    .set(0, 2, PlayerType.X)
  const result = new HorizontalChecker().check(board)
  expect(result.finished).toBeTruthy()
  expect(result.xWins).toBeTruthy()
  expect(result.oWins).toBeFalsy()
})

test('Should continue the game without a victory', () => {
    const board = Board.empty()
    .set(0, 0, PlayerType.X)
    .set(0, 1, PlayerType.X)
    .set(0, 2, PlayerType.O)
    const result = new HorizontalChecker().check(board)
    console.log(result)
    expect(result.inProgress).toBeTruthy()
    expect(result.xWins).toBeFalsy()
    expect(result.oWins).toBeFalsy()

})