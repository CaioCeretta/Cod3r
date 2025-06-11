"use client";

import { GameContext } from "@/contexts/GameContext";
import { useContext } from "react";
import Modal from "../shared/Modal";
import { PlayerType } from "core";
import { IconCircle, IconX } from "@tabler/icons-react";

export const Result = () => {
  const { result } = useContext(GameContext);

  return (
    <Modal visible={result.finished}>
      {result.tied ? (
        <>
          <span className="uppercase font-bold text-light text-4xl">
            It was a draw!
          </span>
        </>
      ) : (
        <>
          <span className="uppercase font-bold text-light text-2xl">
            Player {result.xWins ? PlayerType.X : PlayerType.O} won!
          </span>
          <div
            className={`flex items-center gap-5 ${
              result.xWins ? "text-primary-500" : "text-secondary-500"
            }`}
          >
            {result.xWins ? (
              <IconX size={80} stroke={6} />
            ) : (
              <IconCircle size={70} stroke={6} />
            )}
            <span className="uppercase text-6xl font-bold">won the round</span>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Result;
