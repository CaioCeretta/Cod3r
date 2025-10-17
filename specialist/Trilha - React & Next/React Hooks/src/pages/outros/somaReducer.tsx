import { type Reducer, useReducer } from "react";
import InputFormatadoSemLabel from "@/components/formulario/InputFormatadoSemLabel";
import Botao from "@/components/template/Botao";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  type Estado = {
    n1: number;
    n2: number;
    validadeN1: boolean;
    validadeN2: boolean;
    soma: number;
  };

  type Acao =
    | { type: "ALTERA_N1"; payload: number }
    | { type: "ALTERA_N2"; payload: number }
    | { type: "SOMA"; }

  function mudaDados(estadoAtual: Estado, acao: Acao) {
    switch (acao.type) {
      case "ALTERA_N1":
        return {
          ...estadoAtual,
          n1: acao.payload,
          validadeN1: acao.payload > 0,
        };

      case "ALTERA_N2":
        return {
          ...estadoAtual,
          n2: acao.payload,
          validadeN2: acao.payload > 0,
        };

      case "SOMA":
        if (estadoAtual.validadeN1 && estadoAtual.validadeN2) {
          const soma = estadoAtual.n1 + estadoAtual.n2;
          return { ...estadoAtual, soma };
        } else {
          return { ...estadoAtual, soma: -9999 };
        }
      /* or
      }
      return { ...estadoAtual, soma: estadoAtual.n1 + estadoAtual.n2 }
      */

      default:
        return estadoAtual;
    }
  }

  const [dados, dispatch] = useReducer(mudaDados, {
    n1: 0,
    n2: 0,
    validadeN1: false,
    validadeN2: false,
    soma: 0,
  });

  const actions = {
    alteraN1: (valor: number): Acao => ({ type: "ALTERA_N1", payload: valor }),
    alteraN2: (valor: number): Acao => ({ type: "ALTERA_N2", payload: valor }),
    soma: (): Acao => ({ type: "SOMA" })
  }

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
              dispatch(actions.alteraN1(+e.currentTarget.value))
            }
          ></InputFormatadoSemLabel>
          <span className="text-4xl">+</span>

          <InputFormatadoSemLabel
            semLabel={true}
            tipo="number"
            valor={dados.n2}
            onChange={(e) =>
              dispatch(actions.alteraN2(+e.currentTarget.value))
            }
          ></InputFormatadoSemLabel>

          <Botao
            cor="bg-orange-400"
            onClick={() => dispatch(actions.soma())}
            texto="="
          />
        </Flex>
        <Display texto={dados.soma} />
      </Flex>
    </Pagina>
  );
}
