import { Game, Player, PlayerType } from "../../src"

test('Should return the next player', () => {
  const game = Game.create(new Player('P1', PlayerType.O), new Player('P2', PlayerType.X))

  expect(game.currentPlayer.type).toBe(PlayerType.O)
  expect(game.nextRound().currentPlayer.type).toBe(PlayerType.X)

})

test('The game should end with a victory for #1', () => {

    const game = Game.create(new Player('P1', PlayerType.O), new Player('P2', PlayerType.X))
          .addMove(0, 0)
          .addMove(1,1)
          .addMove(0,1)
          .addMove(1,2)
          .addMove(0,2)

    expect(game.result.finished).toBeTruthy()
    expect(game.result.xWins).toBeFalsy()
    expect(game.result.oWins).toBeTruthy()
    expect(game.player1.score).toBe(1)
    expect(game.player2.score).toBe(0)
})

test('The game should end with a victory for #2', () => {

    const game = Game.create(new Player('P1', PlayerType.O), new Player('P2', PlayerType.X))
          .addMove(1,1)
          .addMove(0,0)
          .addMove(1,2)
          .addMove(0,1)
          .addMove(2,2)
          .addMove(0,2)
          .addMove(2,0)

    expect(game.result.finished).toBeTruthy()
    expect(game.result.oWins).toBeFalsy()
    expect(game.result.xWins).toBeTruthy()
    expect(game.player1.score).toBe(0)
    expect(game.player2.score).toBe(1)
})

test('The game should be cleared after a victory', () => {

    const game = Game.create(new Player('P1', PlayerType.O), new Player('P2', PlayerType.X))
          .addMove(0, 0)
          .addMove(1,1)
          .addMove(0,1)
          .addMove(1,2)
          .addMove(0,2)
          .clear()

    expect(game.result.inProgress).toBeTruthy()
    expect(game.player1.score).toBe(0)
    expect(game.player2.score).toBe(0)
})

test('Should go to the next round after a victory', () => {

    const game = Game.create(new Player('P1', PlayerType.O), new Player('P2', PlayerType.X))
          .addMove(0, 0)
          .addMove(1,1)
          .addMove(0,1)
          .addMove(1,2)
          .addMove(0,2)
          .nextRound()

    expect(game.result.inProgress).toBeTruthy()
    expect(game.player1.score).toBe(1)
    expect(game.player2.score).toBe(0)
    expect(game.currentPlayer.type).toBe(game.player2.type)
})

test('Should alternate the player by clearing the game', () => {

    const game = Game.create(new Player('P1', PlayerType.X), new Player('P2', PlayerType.O))
          
    expect(game.currentPlayer.type).toBe(game.player1.type)

    const newGame = game.clear()
    expect(newGame.currentPlayer.type).toBe(game.player2.type)
})

test('Should alternate the player by going to the next round', () => {

    const game = Game.create(new Player('P1', PlayerType.X), new Player('P2', PlayerType.O))
      .nextRound()
          
    expect(game.currentPlayer.type).toBe(game.player2.type)

    const newGame = game.clear()
    expect(newGame.currentPlayer.type).toBe(game.player1.type)
})

test('Should ignore repeated play', () => {
      const game = Game.create(new Player('P1', PlayerType.X), new Player('P2', PlayerType.O))
      .addMove(0, 0)

      const newGame = game.addMove(0, 0)

      expect(game === newGame).toBeTruthy()
})

test('Should ignore a winning game move', () => {
      const game = Game.create(new Player('P1', PlayerType.X), new Player('P2', PlayerType.O))
      .addMove(1, 1)
      .addMove(0, 0)
      .addMove(1, 2)
      .addMove(0, 1)
      .addMove(2, 2)
      .addMove(2, 0)

      const newGame = game.addMove(2, 2)

      expect(game === newGame).toBeTruthy()
})

test('Should generate a tied game', () => {
      const game = Game.create(new Player('P1', PlayerType.X), new Player('P2', PlayerType.O))
      .addMove(0, 0)
      .addMove(0, 1)
      .addMove(0, 2)
      .addMove(1, 1)
      .addMove(1, 0)
      .addMove(1, 2)
      .addMove(2, 1)
      .addMove(2, 0)
      .addMove(2, 2)

      expect(game.result.finished).toBeTruthy()
      expect(game.result.tied).toBeTruthy()
})
