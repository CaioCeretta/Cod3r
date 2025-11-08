import { Erros } from "@/core/constants/Erros";
import Usuario from "@/core/usuario/UsuarioAnemicoV3";

const usuarioValido = () => {
	return new Usuario(1, "Caio", "caio@jbil.com.br", "123456");
};

test("Deve permitir usuario com nome undefined", () => {
	const usuario: Usuario = usuarioValido();
	usuario.setNome(undefined as any);

	expect(usuario.getNome()).toBe(undefined);
});
test("Deve permitir usuario sem nome", () => {
	const usuario: Usuario = usuarioValido();
	usuario.setNome("");

	expect(usuario.getNome()).toBe("");
});

test("Deve permitir usuario com id negativo", () => {
	const usuario: Usuario = usuarioValido();
	usuario.setId(-300);

	expect(usuario.getId()).toBe(-300);
});

test("Não deve permitir usuario com email invalido", () => {
	const usuario: Usuario = usuarioValido();
	usuario.setEmail("@!%S");

	expect(usuario.getEmail()).toBe(usuario.getEmail());
});

test("Deve lançar erro ao tentar alterar a senha com tamanho menor que 6 caracteres", () => {
	const usuario: Usuario = usuarioValido();

	expect(() => usuario.setSenha("a")).toThrow(Erros.SENHA_INVALIDA);
});

test("Deve alterar senha com senha maior ou igual a 6 caracteres", () => {
	const novaSenhaValida = "563521";
	const usuario: Usuario = usuarioValido();
	usuario.setSenha(novaSenhaValida);

	expect(usuario.getSenha()).toBe("563521");
});
