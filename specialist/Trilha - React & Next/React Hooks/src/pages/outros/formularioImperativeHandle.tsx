import { useRef } from "react";
import InputComReferencia from "@/components/formulario/InputComReferencia";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Pagina
      titulo="Modificando uma referência"
      subtitulo="Usando useRef e useImperativeHandle"
    >
      <Flex col>
        <InputComReferencia ref={inputRef} tipo="text" label="Digite o Texto" valor="" />
      </Flex>
    </Pagina >
  )
}
