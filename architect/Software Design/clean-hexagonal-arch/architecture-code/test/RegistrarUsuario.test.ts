import BCryptAdapter from "../src/exemplo/adaptadores/auth/BCryptAdapter";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco";
import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria";
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";

test("Deve registrar um usuário invertendo a senha", () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const inverterSenha = new InverterSenha();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, inverterSenha);

	const usuario = casoDeUso.executar("Caio", "ccc@zmail.com.br", "123456");

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário colocando espaços entre a senha", () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaComEspaco = new SenhaComEspaco();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaComEspaco);

	const usuario = casoDeUso.executar("Caio", "ccc@zmail.com.br", "123456");

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada", () => {
	const usuarioEmMemoria = new UsuarioEmMemoria();
	const senhaCriptografada = new BCryptAdapter();

	const casoDeUso = new RegistrarUsuario(usuarioEmMemoria, senhaCriptografada);

	const usuario = casoDeUso.executar("Caio", "ccc@zmail.com.br", "123456");

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(senhaCriptografada.comparar("123456", usuario.senha)).toBeTruthy;
});
