"use client";

import { GameContext } from "@/contexts/GameContext";
import { useContext } from "react";
import CellArea from "./CellArea";

export const BoardArea = () => {
  const { board, addMove, result } = useContext(GameContext);

  function renderCells() {
    const cells = [];

    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const selected = result.hasCell(row, col);
        cells.push(
          <div key={`${row}-${col}`} onClick={() => addMove(row, col)}>
            <CellArea type={board.get(row, col)?.type} selected={selected} />
          </div>
        );
      }
    }

    return cells;
  }

  return <div className="grid grid-cols-3 gap-5">{renderCells()}</div>;
};

export default BoardArea;
