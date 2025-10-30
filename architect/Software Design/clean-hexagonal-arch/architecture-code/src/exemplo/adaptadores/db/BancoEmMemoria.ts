import type Colecao from "../../app/portas/Colecao";

export default class BancoEmMemoria implements Colecao {
	private static itens: any[] = [];

	inserir(item: any) {
		BancoEmMemoria.itens.push(item);
		return item;
	}
}
