import { PlayerType } from '../../src'
import Board from '../../src/game/Board'

test('It should create an empty board', () => {
	const board = Board.empty()
	expect(board.cols).toBe(3)
	expect(board.rows).toBe(3)
	expect(board.isFull()).toBeFalsy()
})

test('It must return all the cells of a board', () => {
	const board = Board.empty()
	expect(board.items.length).toBe(9)
})

test('It must mark by cell and column', () => {
	const board = Board.empty().set(1, 1, PlayerType.X)
	expect(board.isNotEmpty(1, 1)).toBeTruthy()
	expect(board.isEmpty(1, 1)).toBeFalsy()
})

test('It must return empty for non existent cells', () => {
	const board = Board.empty()
	expect(board.isEmpty(10, 1)).toBeTruthy()
	expect(board.isNotEmpty(10, 1)).toBeFalsy()
})

test('It must ignore if one tries to mark an non-existent cell', () => {
	const board = Board.empty()
	const sameBoard = board.set(10, 1, PlayerType.X)
	expect(board === sameBoard).toBeTruthy()
})

test('should return the same Board instance if row index is out of bounds', () => {
	const board = Board.empty()
	const outOfBoundsRow = 10
	const col = 0
	const type = 'X' as PlayerType

	const result = board.set(outOfBoundsRow, col, type)

	// Expects the result to be have unaltered state
	expect(result).toBe(board)
})

test('should return the same Board instance if col index is out of bounds', () => {
	const board = Board.empty()
	const row = 0
	const outOfBoundsCol = 10
	const type = 'X' as PlayerType

	const result = board.set(row, outOfBoundsCol, type)

	expect(result).toBe(board)
})
