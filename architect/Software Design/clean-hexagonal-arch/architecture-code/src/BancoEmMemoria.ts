import type Colecao from "./Colecao";

export default class BancoEmMemoria implements Colecao {
	private static itens: any[] = [];

	inserir(item: any) {
		BancoEmMemoria.itens.push(item);
		return item;
	}
}
