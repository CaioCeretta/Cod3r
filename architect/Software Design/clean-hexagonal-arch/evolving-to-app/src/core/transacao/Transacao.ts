export default interface Transacao {
	id: string;
	descricao: string;
	valor: number;
	vencimento: Date;
	idUsuario: string;
}
