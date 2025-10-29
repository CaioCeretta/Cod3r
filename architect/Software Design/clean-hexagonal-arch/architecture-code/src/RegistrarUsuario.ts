import BancoEmMemoria from "./BancoEmMemoria";
import Banco from "./BancoEmMemoria";
import type Colecao from "./Colecao";
import InverterSenha from "./InverterSenha";

export default class RegistrarUsuario {
	private inverterSenha = new InverterSenha();

	constructor(private colecao: Colecao) {}

	executar(nome: string, email: string, senha: string) {
		const senhaCripto = this.inverterSenha.cripto(senha);

		const usuario = {
			id: Math.random(),
			nome,
			email,
			senha: senhaCripto,
		};

		this.colecao.inserir(usuario);

		return usuario;
	}
}
