import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import InputFormatado from "../formulario/InputFormatado";
import Botao from "../template/Botao";
import Janela from "../template/Janela";

export default function AdicionarProduto() {
    const [quantidade, setQuantidade] = useState(1);
    const [preco, setPreco] = useState(1.99);

    const adicionar = () => {
        const sequencia = 1;
        const produto = {
            id: sequencia,
            nome: `Produto ${sequencia}`,
            quantidade: quantidade,
            preco: preco,
        };
    };

    return (
        <Janela titulo="Adicionar Produto" cor="bg-purple-700">
            <InputFormatado
                label="Adicionar"
                tipo="number"
                valor={quantidade}
                onInput={(e) => setQuantidade(e.target.value)}
            ></InputFormatado>
            <InputFormatado
                label="Itens de R$"
                tipo="number"
                valor={preco}
                onInput={(e) => setPreco(e.target.value)}
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
