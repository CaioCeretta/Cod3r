export default interface ProvedorToken {
	gerar(payload: string | object): string;
	validar(token: string): string | object;
}
