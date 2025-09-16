export default class ErroValidacao extends Error {
	constructor(
		mensagem: string,
		readonly status = 400,
	) {
		super(mensagem);
	}
}
