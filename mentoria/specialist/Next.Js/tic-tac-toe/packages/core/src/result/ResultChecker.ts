import type Board from '../game/Board'
import type GameResult from './GameResult'

export interface ResultChecker {
	check(board: Board): GameResult
}
