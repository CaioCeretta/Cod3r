import Erros from "../constants/Erros";
import Validador from "../utils/Validador";

export default class UsuarioAnemicoV4 {
	constructor(
		private _id: number,
		private _nome: string,
		private _email: string,
		private _senha?: string,
	) {
		this.setId(_id);
		this.setNome(_nome);
		this.setEmail(_email);
		_senha && this.setSenha(_senha);
	}

	getId(): number {
		return this._id;
	}

	setId(id: number) {
		this._id = id;
	}

	getNome(): string {
		return this._nome;
	}

	setNome(nome: string) {
		this._nome = nome;
	}

	getEmail(): string {
		return this._email;
	}

	setEmail(email: string) {
		Validador.isEmailValido(email);
	}

	getSenha() {
		return this._senha;
	}

	setSenha(senha: string) {
		if (senha.length < 6) throw new Error(Erros.SENHA_INVALIDA);

		this._senha = senha;
	}
}
