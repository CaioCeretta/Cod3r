import { useState } from "react";
import AdicionarProduto from "@/components/loja/AdicionarProduto";
import Carrinho from "@/components/loja/Carrinho";
import FinalizarCompra from "@/components/loja/FinalizarCompra";
import Display from "@/components/template/Display";
import Flex from "@/components/template/Flex";
import Pagina from "@/components/template/Pagina";


export default function () {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <Pagina
      titulo="Loja"
      subtitulo="Compartilhando informações entre múltiplos componentes com useContext"
    >
      <Flex col gap={4}>
        <Flex gap={4}>
          <AdicionarProduto />
          <FinalizarCompra />
        </Flex>
        <Carrinho />
      </Flex>
    </Pagina>
  );
}
