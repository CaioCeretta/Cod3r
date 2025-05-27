import Cell from '../shared/Cell'
import type { PlayerType } from '../shared/PlayerType'

export default class Board {
	/**
	 * Creates a new Board instance.
	 * @param state A 2D array (3x3) of Cell objects representing the board state.
	 */
	private constructor(readonly state: Cell[][]) {}

	/**
	 * Creates an empty board with all cells initialized to null.
	 * @returns A new Board instance representing an empty Tic-Tac-Toe grid.
	 */
	static empty(): Board {
		return new Board([
			[
				new Cell(0, 0, null),
				new Cell(0, 1, null),
				new Cell(0, 2, null),
			],
			[
				new Cell(1, 0, null),
				new Cell(1, 1, null),
				new Cell(1, 2, null),
			],
			[
				new Cell(2, 0, null),
				new Cell(2, 1, null),
				new Cell(2, 2, null),
			],
		])
	}

	/**
	 * Gets the number of rows in the board.
	 */
	get rows(): number {
		return this.state.length
	}

	/**
	 * Gets the number of columns in the board.
	 */
	get cols(): number {
		return this.state[0]!.length
	}

	/* flattens the array*/
	get items(): Cell[] {
		return this.state.flat()
	}

	/* After the line and the column it will try to find a cell */
	get(row: number, col: number): Cell | null {
		return this.state[row]?.[col] ?? null
	}

	/* Check if the cel is empty based on its row and column */
	isEmpty(row: number, col: number): boolean {
		return this.get(row, col)?.isEmpty() ?? true
	}

	/* Simply reverts the result of the function above */

	isNotEmpty(row: number, col: number): boolean {
		return !this.isEmpty(row, col)
	}

	/* Checks if all the cells in the board have a value assigned to it */

	isFull(): boolean {
		return this.items.every((cell) => cell.type !== null)
	}

	set(row: number, col: number, type: PlayerType): Board {
		const c = this.get(row, col)

		if (!c || c.isNotEmpty()) return this

		const state = this.state.map((r) => [...r])

		if (!state[row] || !state[row][col]) return this

		state[row][col] = state[row][col].markWith(type)

		return new Board(state)
	}
}
