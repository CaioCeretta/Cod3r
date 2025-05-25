import { Cell, PlayerType } from '../../src'

test('Should create a filled cell', () => {
	const cell = new Cell(0, 2, PlayerType.X)
	expect(cell.row).toBe(0)
	expect(cell.col).toBe(2)
	expect(cell.type).toBe(PlayerType.X)
	expect(cell.isEmpty()).toBeFalsy()
	expect(cell.isNotEmpty()).toBeTruthy()
})

test('Should create a empty cell', () => {
	const cell = new Cell(0, 2)
	expect(cell.row).toBe(0)
	expect(cell.col).toBe(2)
	expect(cell.type).toBeNull()
	expect(cell.isEmpty()).toBeTruthy()
	expect(cell.isNotEmpty()).toBeFalsy()
})

test('Should transform an empty Cell in a filled one', () => {
	const emptyCell = new Cell(0, 2)
	const cell = emptyCell.markWith(PlayerType.O)
	expect(cell.type).toBe(PlayerType.O)
})

test('Should ignore marking on a pre-filled cell', () => {
	const cell = new Cell(0, 2).markWith(PlayerType.O)
	const sameCell = cell.markWith(PlayerType.X)
	expect(cell === sameCell).toBeTruthy()
})
