import type { ProdutoProps } from "../../core/produto/model/Produto";

export default interface ProdutoDTO extends ProdutoProps {
	precoFormatado?: string;
}
