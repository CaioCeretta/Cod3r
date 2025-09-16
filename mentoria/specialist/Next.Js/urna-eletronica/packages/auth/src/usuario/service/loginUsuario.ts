import { ErroValidacao } from '@urna/shared';
import type ProvedorSenhaCriptografada from '../interface/ProvedorSenhaCriptografada';
import type RepositorioUsuario from '../interface/RepositorioUsuario';
import type Usuario from '../model/Usuario';

// This function returns never, instead of undefined because it may return an exception
export default async function loginUsuario(props: {
	repo: RepositorioUsuario;
	cripto: ProvedorSenhaCriptografada;
	email: string;
	senha: string;
}): Promise<Usuario | never> {
	const { repo, cripto, email, senha } = props;

	const usuario = await repo.buscarPorEmail(email);

	if (!usuario) {
		throw new ErroValidacao('User not found');
	}

	const senhaCorreta = await cripto.comparar(senha, usuario.senha!);

	// This is not a good practice, but just following the course.
	if (!senhaCorreta) {
		throw new ErroValidacao('Invalid Password');
	}

	/* Important to ensure that we are not sending the password, even if its encrypted, since it's a big security mistake
	if we return it in a login process */
	return { ...usuario, senha: undefined };
}
