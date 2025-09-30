import Botao from "./Botao";
import Flex from "./Flex";

export default function SeletorDeCor() {
  const cores = [
    "red-400",
    "blue-500",
    "pink-500",
    "orange-500",
    "green-500",
    "purple-500",
    "yellow-600",
  ];

  const listaCores = cores.map((cor) => {
    return <Botao key={cor} cor={`bg-${cor}`}></Botao>;
  });

  return (
    <Flex center gap={4} className="absolute right-3 top-20">
      {listaCores}
    </Flex>
  )
}
