export default interface ProvedorCriptografia {
	criptografar(senha: string);

	comparar(senha: string, senhaCriptografada: string): boolean;
}
