import { Erros } from "@/constants/Erros";
import UsuarioBuilder from "../data/UsuarioBuilder";

test("Deve criar um usuário", () => {
	const nomeCompleto = "Fulano da Silva";
	const email = "fulano.silva@zmail.com";
	const usuario = UsuarioBuilder.criar()
		.comNome(nomeCompleto)
		.comEmail(email)
		.agora();
	expect(usuario.nome.completo).toBe(nomeCompleto);
	expect(usuario.email.valor).toBe(email);
	expect(usuario.senha).toBeDefined();
});

test("Deve criar um usuário sem senha", () => {
	const usuario = UsuarioBuilder.criar().semSenha().agora();
	expect(usuario.senha).toBeUndefined();
});

test("Deve lançar um erro quando o nome não for informado", () => {
	expect(() => UsuarioBuilder.criar().semNome().agora()).toThrow(
		Erros.NOME_VAZIO,
	);
});

test("Deve lançar um erro quando o nome não tiver sobrenome", () => {
	expect(() => UsuarioBuilder.criar().comNome("Pedro").agora()).toThrow(
		Erros.NOME_SEM_SOBRENOME,
	);
});

test("Deve lançar um erro quando usuário estiver sem email", () => {
	expect(() => UsuarioBuilder.criar().semEmail().agora()).toThrow(
		Erros.EMAIL_INVALIDO,
	);
});
