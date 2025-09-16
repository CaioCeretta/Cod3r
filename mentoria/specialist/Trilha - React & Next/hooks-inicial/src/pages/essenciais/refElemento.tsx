import { IconArrowLeft } from "@tabler/icons-react";
import { useRef } from "react";
import Botao from "@/components/template/Botao";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const referencia = useRef<any>('');

  function apagar() {
    referencia.current.innerText = referencia.current.innerText.slice(0, -1)
  }

  return (
    <Pagina
      titulo="Referenciando um elemento"
      subtitulo="Usando referências na DOM"
    >
      <Flex col center>
        <p className="text-4xl text-gray-300 m-4" ref={referencia}>Texto Legal!</p>
        <Botao
          onClick={apagar}
          redondo
          tamanho="2xl"
          cor="bg-sky-500"
          icone={<IconArrowLeft />}
        />
      </Flex>
    </Pagina>
  );
}
