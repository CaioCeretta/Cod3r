import { useCallback, useState } from "react";
import InputFormatado from "@/components/formulario/InputFormatado";
import Botao from "@/components/template/Botao";
import BotaoMemoizado from "@/components/template/BotaoMemoizado";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";

export default function () {
  const [quantidade, setQuantidade] = useState(0);

  const finalizar = useCallback((e) => {
    e.preventDefault();
    // window.alert("Finalizada!");
    window.alert(`${quantidade} produtos`)
    setQuantidade(0);
  }, []);

  return (
    <Pagina
      titulo="Memoizando Funções"
      subtitulo="Entendendo o hook useCallback"
    >
      <Display texto="Quantos produtos você quer?" />
      <form>
        <Flex col center>
          <InputFormatado
            valor={quantidade}
            tipo="number"
            onInput={(e) => setQuantidade(+e.target.value)}
          />
          <BotaoMemoizado texto="Confirmar" onClick={finalizar} />
        </Flex>
      </form>
    </Pagina>
  );
}
