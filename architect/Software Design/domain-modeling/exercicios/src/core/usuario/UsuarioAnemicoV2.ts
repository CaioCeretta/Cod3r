export default class UsuarioAnemicoV2 {
	constructor(
		public id: number,
		public nome: string,
		public email: string,
		public senha?: string,
	) {}
}
