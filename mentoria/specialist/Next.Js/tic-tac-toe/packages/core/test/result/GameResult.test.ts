import { Cell, GameResult, PlayerType } from '../../src'

test('It should create a tied result', () => {
	const tied = new GameResult([], true)
	expect(tied.finished).toBeTruthy()
	expect(tied.tied).toBeTruthy()
	expect(tied.inProgress).toBeFalsy()
})

test('It should create a victory scenario', () => {
	const c1 = new Cell(0, 0, PlayerType.X)
	const c2 = new Cell(0, 1, PlayerType.X)
	const c3 = new Cell(0, 2, PlayerType.X)

	const victory = new GameResult([c1, c2, c3])

	expect(victory.finished).toBeTruthy()
	expect(victory.tied).toBeFalsy()
	expect(victory.hasCell(0, 0)).toBeTruthy()
	expect(victory.hasCell(1, 1)).toBeFalsy()
})
