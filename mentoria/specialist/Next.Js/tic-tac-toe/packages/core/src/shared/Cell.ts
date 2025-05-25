import type { PlayerType } from './PlayerType'

export default class Cell {
	constructor(
		readonly row: number,
		readonly col: number,
		readonly type: PlayerType | null = null
	) {}

	/* this checks if the Cell is already signed, if yes, it will simply return itself, otherwise returns a new cell with
  same data and only the type will now be the one signed */
	markWith(type: PlayerType): Cell {
		if (this.type !== null) return this
		return new Cell(this.row, this.col, type)
	}

	// Simply verifies if the Cell is empty
	isEmpty(): boolean {
		return this.type === null
	}

	// Returns the opposite of the isEmpty function, it checks if the cell has already been signed. same as !isEmpty()
	isNotEmpty(): boolean {
		return !this.isEmpty()
	}
}
