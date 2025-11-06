import axios from "axios";
import usuarios from "../data/usuarios";

const baseUrl = process.env.API_URL;

export async function getAuthorizationHeader() {
	const resp = await axios.post(`${baseUrl}/login`, usuarios.completo);
	console.log("Token recebido:", resp.data.token);

	return {
		headers: {
			Authorization: `Bearer ${resp.data.token}`,
		},
	};
}
