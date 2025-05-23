import { Player } from '../../src'
import { PlayerType } from '../../src'

test('Should return the same instance when adding 0 points', () => {
	const player = new Player('P1', PlayerType.O)
	expect(player.addScore(0) === player).toBeTruthy()
})

test('Should return a different instance when adding points', () => {
	const player = new Player('P1', PlayerType.O)
	expect(player.addScore(1) === player).toBeFalsy()
})

test('Should add 10 points to a player', () => {
	const player = new Player('P1', PlayerType.O).addScore(10)
	expect(player.name).toBe('P1')
	expect(player.type).toBe(PlayerType.O)
	expect(player.score).toBe(10)
})

test('Should clear a player with existing score', () => {
	const player = new Player('P1', PlayerType.O, 100).clear()
	expect(player.name).toBe('P1')
	expect(player.type).toBe(PlayerType.O)
	expect(player.score).toBe(0)
})
