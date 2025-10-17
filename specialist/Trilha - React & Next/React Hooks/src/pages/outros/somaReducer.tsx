import { type ChangeEvent, type Reducer, useEffect, useReducer, useState } from "react";
import InputFormatadoSemLabel from "@/components/formulario/InputFormatadoSemLabel";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";



export default function () {

  type Estado = {
    n1: number,
    n2: number,
    validadeN1: boolean,
    validadeN2: boolean,
    soma: number
  }

  function mudaDados(estadoAtual: Estado, acao) {
    switch (acao.type) {
      case "ALTERA_N1":
        window.alert(estadoAtual.n1)
        return {
          ...estadoAtual,
          n1: acao.payload,
          validadeN1: acao.payload > 0
        }

      case "ALTERA_N2":
        window.alert("N2")
        return { ...estadoAtual, n2: acao.payload, validadeN2: acao.payload > 0 }
      default:
        return estadoAtual
    }
  }

  const [dados, dispatch] = useReducer<Reducer<any, any>>(mudaDados, {
    n1: 10,
    n2: 10,
    validadeN1: false,
    validadeN2: false,
    soma: 10
  });

  // useEffect(() => {
  //   setValidadeN1(n1 > 0)
  // }, [dados.n1])

  // useEffect(() => {
  //   setValidadeN2(n2 > 0)
  // }, [dados.n2])

  // function fazSoma() {
  //   if (validadeN1 && validadeN2) {
  //     setSoma(n1 + n2)
  //   } else {
  //     setSoma(-99999)
  //   }
  // }


  return (
    <Pagina titulo="Soma com useState" subtitulo="Exemplo de soma com useState">
      <Flex col centerCross>
        <Display texto="Faça uma soma" />
        <Flex center>
          <InputFormatadoSemLabel
            semLabel={true}
            tipo="number"
            valor={dados.n1}
            onChange={(e) =>
              dispatch({ type: 'ALTERA_N1', payload: +e.currentTarget.value })
            }
          ></InputFormatadoSemLabel>
          <span className="text-4xl">+</span>

          <InputFormatadoSemLabel
            semLabel={true}
            tipo="number"
            valor={dados.n2}
            onChange={(e) =>
              dispatch({ type: 'ALTERA_N2', payload: +e.currentTarget.value })
            }
          ></InputFormatadoSemLabel>

          <Botao cor="bg-orange-400" onClick={() => { }} texto="=" />
        </Flex>
        <Display texto={dados.n1} />
      </Flex>
    </Pagina>
  );
}
