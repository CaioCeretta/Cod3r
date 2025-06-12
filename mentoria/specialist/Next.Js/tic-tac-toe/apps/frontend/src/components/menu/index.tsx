"use client";

import { GameContext } from "@/contexts/GameContext";
import { IconX, IconCircle, IconReload } from "@tabler/icons-react";
import { useContext } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import { PlayerType } from "core";

export const Menu = () => {
  const { restart, currentPlayer } = useContext(GameContext);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <IconX size={40} stroke={6} className="text-primary-500" />
        <IconCircle size={35} stroke={6} className="text-secondary-500" />
      </div>
      <Card color="dark">
        <div className="flex justify-center items-center gap-2 h-10 w-32 text-light-500">
          {currentPlayer.type === PlayerType.X && (
            <IconX size={30} stroke={6} />
          )}
          {currentPlayer.type === PlayerType.O && (
            <IconCircle size={30} stroke={6} />
          )}
          <span className="text-xl">TURN</span>
        </div>
      </Card>
      <div className="flex justify-end w-32">
        <Button color="light" onClick={restart}>
          <IconReload stroke={2} className="text-dark-500" />
        </Button>
      </div>
    </div>
  );
};

export default Menu;
