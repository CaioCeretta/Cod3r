import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Contexto } from "@/pages/contexto/loja";
import InputFormatado from "../formulario/InputFormatado";
import Botao from "../template/Botao";
import Janela from "../template/Janela";

export default function AdicionarProduto() {

    const [quantidade, setQuantidade] = useState<number>(0)
    const [preco, setPreco] = useState(1.99);

    const { carrinho, setCarrinho } = useContext(Contexto);

    const adicionar = () => {
        const sequencia = carrinho.length + 1;
        const produto = {
            id: sequencia,
            nome: `Produto ${sequencia}`,
            quantidade: setQuantidade((prev) => prev + 1),
            preco: preco,
        };
        setCarrinho((carrinhoAtual: any) => [...carrinhoAtual, produto])

    };

    useEffect(() => {
        console.table(carrinho)
    }, [carrinho])

    return (
        <Janela titulo="Adicionar Produto" cor="bg-purple-700">
            <InputFormatado
                label="Adicionar"
                tipo="number"
                valor={quantidade}
                onInput={(e) => setQuantidade(+e.target.value)}
            ></InputFormatado>
            <InputFormatado
                label="Itens de R$"
                tipo="number"
                valor={preco}
                onInput={(e) => setPreco(+e.target.value)}
            ></InputFormatado>
            <Botao
                cor="bg-green-600"
                icone={<IconPlus />}
                texto="Adicionar"
                onClick={adicionar}
            />
        </Janela>
    );
}
