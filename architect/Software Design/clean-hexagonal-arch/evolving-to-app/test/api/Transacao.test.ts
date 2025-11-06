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
