export default interface ProvedorCriptografia {
	criptografar(senha: string): string;
	comparar(senha: string, hash: string): boolean;
}
