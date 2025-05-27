import type Cell from '../shared/Cell'
import { PlayerType } from '../shared/PlayerType'

export default class GameResult {
	constructor(
		readonly winningMove: Cell[] = [],
		private _tied: boolean = false
	) {}

	/* Basically, inside the winning move, it needs to know who is the first element. We can also check if all the three
  winning cells have the same type, because it could determine if the victory is invalid. */

	/* Method to know if X won the game */
	get xWins(): boolean {
		return this.winningMove[0]?.type === PlayerType.X
	}

	/* Method to know if O won the game */
	get oWins(): boolean {
		return this.winningMove[0]?.type === PlayerType.O
	}

	/* returns true if xWins and oWins are false and if _tied is true*/
	get tied(): boolean {
		return !this.xWins && !this.oWins && this._tied
	}

	/* returns true if there is no winningMove nor is tied */
	get inProgress(): boolean {
		return this.winningMove.length === 0 && !this._tied
	}

	/* returns true if inProgress is false*/
	get finished(): boolean {
		return !this.inProgress
	}

	/* Given a row and column, checks whether the corresponding cell is included in the winning move (if there is one) */
	hasCell(row: number, col: number): boolean {
		return (
			this.winningMove.find(
				(c) => c.row === row && c.col === col
			) !== undefined
		)
	}
}
