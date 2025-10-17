import { type ChangeEvent, useState } from "react";
import InputFormatadoSemLabel from "@/components/formulario/InputFormatadoSemLabel";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const [n1, setN1] = useState<string>("");
  const [n2, setN2] = useState<string>("");
  const [sum, setSum] = useState<number>(0)

  function somaEstados() {
    const num1 = parseFloat(n1)
    const num2 = parseFloat(n2)

    if (!Number.isNaN(num1) && !Number.isNaN(num2) && num1 > 0 && num2 > 0) {
      setSum(num1 + num2)
    } else {
      setSum(-999999)
    }

  }



  return (
    <Pagina titulo="Soma com useState" subtitulo="Exemplo de soma com useState">
      <Flex col centerCross>
        <Display texto="Faça uma soma" />
        <Flex center>
          <InputFormatadoSemLabel
            semLabel={true}
            tipo="text"
            valor={n1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setN1(e.target.value)
            }
          ></InputFormatadoSemLabel>
          <span className="text-4xl">+</span>
          <InputFormatadoSemLabel
            semLabel={true}
            tipo="text"
            valor={n2}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setN2(e.target.value)
            }
          ></InputFormatadoSemLabel>

          <Botao cor="bg-orange-400" onClick={somaEstados} texto="=" />
        </Flex>
        <Display texto={sum} />
      </Flex>
    </Pagina>
  );
}
