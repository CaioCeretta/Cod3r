import BCryptAdapter from "../../src/adapters/auth/BCryptAdapter";
import InverterSenha from "../../src/adapters/auth/InverterSenha";
import SenhaComEspaco from "../../src/adapters/auth/SenhaComEspaco";
import ColecaoUsuarioDB from "../../src/adapters/db/knex/ColecaoUsuarioDB";
import UsuarioEmMemoria from "../../src/adapters/db/UsuarioEmMemoria";
import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario";
import usuarios from "../data/usuarios";

beforeEach(() => {
	UsuarioEmMemoria.resetar();
});

test("Deve registrar um usuário invertendo a senha", async () => {
	const colecao = new UsuarioEmMemoria();
	const provedorCripto = new InverterSenha();
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

	const usuario = await casoDeUso.executar({
		nome: usuarios.completo.nome,
		email: usuarios.completo.email,
		senha: usuarios.completo.senha,
	});

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário colocando espaços entre a senha", async () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaComEspaco = new SenhaComEspaco();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaComEspaco);

	const usuario = await casoDeUso.executar({
		nome: usuarios.completo.nome,
		email: usuarios.completo.email,
		senha: usuarios.completo.senha,
	});

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada", async () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaCriptografada = new BCryptAdapter();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaCriptografada);

	const usuario = await casoDeUso.executar({
		nome: usuarios.completo.nome,
		email: usuarios.completo.email,
		senha: usuarios.completo.senha,
	});

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(senhaCriptografada.comparar("123456", usuario.senha)).toBeTruthy;
});

test.skip("Deve registrar um usuario no banco real", async () => {
	const colecao = new ColecaoUsuarioDB();
	const senhaCriptografada = new BCryptAdapter();
	const casoDeUso = new RegistrarUsuario(colecao, senhaCriptografada);

	const usuario = await casoDeUso.executar({
		nome: usuarios.completo.nome,
		email: usuarios.completo.email,
		senha: usuarios.completo.senha,
	});

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(senhaCriptografada.comparar("123456", usuario.senha)).toBeTruthy;
});

test("Deve lançar erro ao utilizar um e-mail já cadastrado", async () => {
	const colecao = new ColecaoUsuarioDB();
	const provedorCripto = new BCryptAdapter();
	const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

	const nome = "Caio Ceretta";
	const email = "caioceretta@gmail.com";
	const senha = "123456";

	const run = async () => await casoDeUso.executar({ nome, email, senha });

	expect(run).rejects.toThrowError("E-mail já cadastrado");
});
