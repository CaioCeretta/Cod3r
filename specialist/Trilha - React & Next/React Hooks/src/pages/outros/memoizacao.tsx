import { useState } from "react";
import InputFormatado from "@/components/formulario/InputFormatado";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(1);
  const [n3, setN3] = useState(1);
  const [n4, setN4] = useState(1);

  const potencia = n1 ** n2;

  return (
    <Pagina titulo="Memoização 1" subtitulo="Usando o hook useMemo">
      <Flex>
        <Display
          texto={
            <>
              <span>{n1}</span>
              <sup>{n2}</sup>
              <span> ={potencia} </span>
            </>
          }
        />
        <Flex>
          <InputFormatado valor={n1} tipo="number" onInput={(e) => setN1(+e.target.value)} />
        </Flex>
      </Flex>
    </Pagina>
  );
}
