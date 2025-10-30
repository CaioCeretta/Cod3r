export default interface ProvedorCriptografia {
	criptografar(senha: string): any;
	comparar(senha: string, senhaCriptografada: string): boolean;
}
