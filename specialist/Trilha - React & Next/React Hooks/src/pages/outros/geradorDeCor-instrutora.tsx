import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";
import useBoolean from "@/data/hooks/useBoolean";

export default function () {
  const [mostrar, toggleMostrar, mostrarTrue, mostrarFalse] = useBoolean();
  const [texto, setTexto] = useState("Clique em sortear")
  const divRef = useRef<any>()

  const geraCorAleatoria = useCallback(() => {
    const numeroAleatorioHexadecimal = Math.floor(Math.random() * 0xffffff);
    const cor = numeroAleatorioHexadecimal.toString(16)

    return cor;
  }, [])

  useLayoutEffect(() => {
    if (mostrar) {
      const cor = geraCorAleatoria()
      setTexto(`#${cor}`)
      divRef.current.style.backgroundColor = `#${cor}`
    } else {
      return setTexto("Clique em sortear")
    }
  }, [mostrar, geraCorAleatoria])

  console.log(texto)

  return (
    <Pagina
      titulo="Gerador de Cor"
      subtitulo="Criando exemplos mais complexos com useLayoutEffect"
    >
      <Flex>
        <Botao texto="Sortear Cor" onClick={mostrarTrue} />
        <Botao texto="Apagar Cor" onClick={mostrarFalse} />
      </Flex>
      <Display texto={texto} />
      {mostrar ? (
        <div ref={divRef} className="w-32 h-32 rounded-md"></div>
      ) : ""}
    </Pagina >
  );
}
