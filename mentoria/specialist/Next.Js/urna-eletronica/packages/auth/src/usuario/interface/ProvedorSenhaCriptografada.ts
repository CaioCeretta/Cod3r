export default interface ProvedorSenhaCriptografada {
	criptografar(senha: string): Promise<string>;
	comparar(senha: string, senhaCriptografada: string): Promise<boolean>;
}
