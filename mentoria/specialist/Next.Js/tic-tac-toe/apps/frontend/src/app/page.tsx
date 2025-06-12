import BoardArea from "@/components/game/BoardArea";
import ScoreBoard from "@/components/game/ScoreBoard";
import Menu from "@/components/menu";
import Result from "@/components/result";

export default function Home() {
  return (
    <div className="flex flex-col space-y-7">
      <Result />
      <Menu />
      <BoardArea />
      <ScoreBoard />
    </div>
  );
}
