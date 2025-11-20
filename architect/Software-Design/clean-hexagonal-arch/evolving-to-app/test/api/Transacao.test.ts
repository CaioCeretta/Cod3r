import axios from "axios";
import transacoes from "../data/transacoes";
import { getAuthorizationHeader } from "../util/auth";

const baseUrl = process.env.API_URL;

test("Deve registrar uma nova transação", async () => {
	const headers = await getAuthorizationHeader();

	try {
		const resp = await axios.post(
			`${baseUrl}/transacao`,
			transacoes.semId,
			headers,
		);
		expect(resp.status).toBe(200);
	} catch (error) {
		console.error(error.response?.status, error.response?.data);
		throw error;
	}
});

test("Deve atualizar uma transação por id", async () => {
	const headers = await getAuthorizationHeader();

	try {
		const resp = await axios.post(
			`${baseUrl}/transacao/<transacao-id>`,
			{ ...transacoes.semId, valor: -173.58 },
			headers,
		);
		expect(resp.status).toBe(200);
	} catch (error) {
		console.error(error.response?.status, error.response?.data);
		throw error;
	}
});

test("Deve popular a tabela com uma lista de transações", async () => {
	try {
		const headers = await getAuthorizationHeader();

		const respostas = transacoes.lista.map(async (transacao) => {
			const resp = await axios.post(`${baseUrl}/transacao`, transacao, headers);

			return resp.status;
		});

		const listaDeStatus = await Promise.all(respostas);
		expect(listaDeStatus.every((s) => s === 200)).toBe(true);
	} catch (e: any) {
		console.log(e.response.daa);
		expect(e.response.status).toBe(400);
	}
});

test("Deve retornar extrato mensal + saldo consolidado", async () => {
	try {
		const headers = await getAuthorizationHeader();

		const resp = await axios.get(`${baseUrl}/extrato/2025/10`, headers);

		console.log("Extrato retornado:", resp.data); // 👈 Veja o conteúdo retornado

		expect(resp.status).toBe(200);
		expect(resp.data).toHaveProperty("saldo");
		expect(resp.data).toHaveProperty("transacoes");
	} catch (e: any) {
		console.log(e.response.data);
		expect(e.response.status).toBe(400);
	}
});
