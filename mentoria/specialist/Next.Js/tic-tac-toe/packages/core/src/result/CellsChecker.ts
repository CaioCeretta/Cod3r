import type Board from '../game/Board'
import type Cell from '../shared/Cell'
import GameResult from './GameResult'
import type { ResultChecker } from './ResultChecker'

export default class CellsChecker implements ResultChecker {
	/*Set of numbers to be verified (array of arrays of rows and columns)*/ 
	constructor(private readonly cells: [number, number][]) {}

	check(board: Board): GameResult {
		const cells = this.cells.map(([row, col]) =>
			board.get(row, col)
		)

		/* Check if all these cells received have a defined type */
		const types = cells.map((c) => c!.type)

		/* see if all the cells are of the same type, if yes, it will generate a result with the winning play, and if not
		return an empty result */
		return types.every(
			(type) => type != null && type === type[0]
		)
		? new GameResult(cells as Cell[])
		: new GameResult()
	}
}
