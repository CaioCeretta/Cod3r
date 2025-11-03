import axios from "axios";
import type Usuario from "../../src/core/usuario/Usuario";

const baseUrl = process.env.API_URL;
const usuario: Partial<Usuario> = {
	nome: "Caio Ceretta",
	email: "cacer@zmail.com",
	senha: "123456",
};

test("Deve registrar um novo usuário se não existir", async () => {
	try {
		const res = await axios.post(`${baseUrl}/registrar`, usuario);

		console.log("Resposta do cadastro:", res.data);

		expect(res.status).toBe(201);
	} catch (e) {
		expect(e.response.status).toBe(400);
		expect(e.response.data).toBe("E-mail já cadastrado");
	}
});

test("Deve logar com e-mail e senha corretos", async () => {
	const res = await axios.post(`${baseUrl}/login`, {
		email: usuario.email,
		senha: usuario.senha,
	});

	expect(res.status).toBe(200);
	expect(res.data.usuario.nome).toBe("Caio Ceretta");
	expect(res.data.usuario.email).toBe("cacer@zmail.com");
	console.log(res.data.token);
	expect(res.data).toHaveProperty("token");
});
