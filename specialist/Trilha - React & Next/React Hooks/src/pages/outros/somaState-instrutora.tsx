import { type ChangeEvent, useEffect, useState } from "react";
import InputFormatadoSemLabel from "@/components/formulario/InputFormatadoSemLabel";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [validadeN1, setValidadeN1] = useState(false)
  const [validadeN2, setValidadeN2] = useState(false)
  const [soma, setSoma] = useState<number>(0)

  useEffect(() => {
    setValidadeN1(n1 > 0)
  }, [n1])

  useEffect(() => {
    setValidadeN2(n2 > 0)
  }, [n2])

  function fazSoma() {
    if (validadeN1 && validadeN2) {
      setSoma(n1 + n2)
    } else {
      setSoma(-99999)
    }
  }


  return (
    <Pagina titulo="Soma com useState" subtitulo="Exemplo de soma com useState">
      <Flex col centerCross>
        <Display texto="Faça uma soma" />
        <Flex center>
          <InputFormatadoSemLabel
            semLabel={true}
            tipo="number"
            valor={n1}
            onInput={(e) =>
              setN1(+e.target.value)
            }
          ></InputFormatadoSemLabel>
          <span className="text-4xl">+</span>
          <InputFormatadoSemLabel
            semLabel={true}
            tipo="number"
            valor={n2}
            onInput={(e) =>
              setN2(+e.target.value)
            }
          ></InputFormatadoSemLabel>

          <Botao cor="bg-orange-400" onClick={fazSoma} texto="=" />
        </Flex>
        <Display texto={soma} />
      </Flex>
    </Pagina>
  );
}
