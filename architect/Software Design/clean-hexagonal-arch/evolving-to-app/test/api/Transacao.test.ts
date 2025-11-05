import axios from "axios";
import { getAuthorizationHeader } from "../util/auth";

const baseUrl = process.env.API_URL;

test("Deve registrar uma nova transação", async () => {
	const headers = await getAuthorizationHeader();

	const resp = await axios.post(`${baseUrl}/transacao`, {}, headers);
	expect(resp.status).toBe(200);
});
