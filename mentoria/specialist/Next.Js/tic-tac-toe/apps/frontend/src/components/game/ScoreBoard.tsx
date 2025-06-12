"use client";

import { useContext } from "react";
import Card from "../shared/Card";
import { GameContext } from "@/contexts/GameContext";
import type { ColorVariant } from "@/types/theme";

export const ScoreBoard = () => {
  const { player1, player2, ties } = useContext(GameContext);

  function renderItem(label: string, value: number, color: ColorVariant) {
    return (
      <Card color={color} noBorder>
        <div className="flex flex-col justify-center items-center w-32">
          <span className="uppercase">{label}</span>
          <span className="text-3xl font-black">{value}</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex gap-7 font-bold text-dark-600 justify-center">
      {renderItem(
        `${player1.type} (${player1.name})`,
        player1.score,
        "primary"
      )}
      {renderItem("Ties", ties, "light")}
      {renderItem(
        `${player2.type} (${player2.name})`,
        player2.score,
        "secondary"
      )}
    </div>
  );
};

export default ScoreBoard;
