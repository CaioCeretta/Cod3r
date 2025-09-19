import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";
import { useRef, useState } from "react";

export default function () {
  const [estado, setEstado] = useState(0)
  const referencia = useRef(0)
  // const referencia = useRef({ nome: "Ariele", idade: 25 });
  console.log(referencia)

  function incrementaReferencia() {
    referencia.current = referencia.current + 1
  }

  return (
    <Pagina titulo="Referência VS State" subtitulo="Entendendo useRef">
      <Display texto={`R: ${referencia.current}`} />
      <Display texto={`S: ${estado}`} />

      <Flex gap={5}>
        <Botao redondo tamanho="2xl" onClick={incrementaReferencia} cor="bg-pink-500" texto="R+" />
        <Botao redondo tamanho="2xl" onClick={() => setEstado(estado + 1)} cor="bg-green-500" texto="S+" />
      </Flex>
    </Pagina>)
}