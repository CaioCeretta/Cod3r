import BancoEmMemoria from "../src/BancoEmMemoria";
import RegistrarUsuario from "../src/RegistrarUsuario";

test("Deve registrar um usuário", () => {
	const bancoEmMemoria = new BancoEmMemoria();

	const casoDeUso = new RegistrarUsuario(bancoEmMemoria);

	const usuario = casoDeUso.executar("Caio", "ccc@zmail.com.br", "123456");

	expect(usuario).toHaveProperty("id");
	expect(usuario.nome).toBe("Caio");
	expect(usuario.senha).toBe("654321");
});
