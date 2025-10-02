import useTema from "@/data/hooks/useTema";
import Botao from "./Botao";
import Flex from "./Flex";

export default function SeletorDeCor() {
  const { cores, setCorDestaque } = useTema()

  const listaCores = cores.map((cor: any) => {
    return <Botao key={cor} cor={`bg-${cor}`}
      onClick={() => setCorDestaque(cor)}></Botao>;
  });

  return (
    <Flex center gap={4} className="absolute right-3 top-20">
      {listaCores}
    </Flex>
  )
}
