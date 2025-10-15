import { useRef } from "react";
import InputComReferencia from "@/components/formulario/InputComReferencia";
import Botao from "@/components/template/Botao";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const inputRef = useRef<any>(null);

  function apagar() {
    inputRef.current.apagar();
  }

  function textoPadrao() {
    inputRef.current.textoPadrao();
  }

  return (
    <Pagina
      titulo="Modificando uma referência"
      subtitulo="Usando useRef e useImperativeHandle"
    >
      <Flex col>
        <InputComReferencia ref={inputRef} tipo="text" label="Digite o Texto" />
        <Flex center>
          <Botao texto="Apagar" onClick={apagar}></Botao>
          <Botao texto="Padrão" onClick={textoPadrao}></Botao>
        </Flex>
      </Flex>
    </Pagina>
  );
}
