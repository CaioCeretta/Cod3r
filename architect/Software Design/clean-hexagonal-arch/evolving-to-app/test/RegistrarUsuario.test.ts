import BCryptAdapter from "../src/adaptadores/auth/BCryptAdapter";
import InverterSenha from "../src/adaptadores/auth/InverterSenha";
import SenhaComEspaco from "../src/adaptadores/auth/SenhaComEspaco";
import ColecaoUsuarioDB from "../src/adaptadores/db/knex/ColecaoUsuarioDB";
import UsuarioEmMemoria from "../src/adaptadores/db/UsuarioEmMemoria";
import RegistrarUsuario from "../src/core/usuario/RegistrarUsuario";

beforeEach(() => {
	UsuarioEmMemoria.resetar();
});

test("Deve registrar um usuário invertendo a senha", async () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const inverterSenha = new InverterSenha();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, inverterSenha);

	const usuario = await casoDeUso.executar(
		"Caio",
		"ccc@zmail.com.br",
		"123456",
	);

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário colocando espaços entre a senha", async () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaComEspaco = new SenhaComEspaco();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaComEspaco);

	const usuario = await casoDeUso.executar(
		"Caio",
		"ccc@zmail.com.br",
		"123456",
	);

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada", async () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaCriptografada = new BCryptAdapter();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaCriptografada);

	const usuario = await casoDeUso.executar(
		"Caio",
		"ccc@zmail.com.br",
		"123456",
	);

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(senhaCriptografada.comparar("123456", usuario.senha)).toBeTruthy;
});

test("Deve registrar um usuario no banco real", async () => {
	const colecao = new ColecaoUsuarioDB();
	const senhaCriptografada = new BCryptAdapter();
	const casoDeUso = new RegistrarUsuario(colecao, senhaCriptografada);

	const usuario = await casoDeUso.executar(
		"Caio",
		"ccc@zmail.com.br",
		"123456",
	);

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

	await casoDeUso.executar(nome, email, senha);

	const run = async () => await casoDeUso.executar(nome, email, senha);

	await expect(run).rejects.toThrowError("E-mail já cadastrado");
});
