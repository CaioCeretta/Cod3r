const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAPI() {
	async function httpGet(url: string): Promise<any> {
		const req = await fetch(`${BASE_URL}/${url}`);
		const dados = await req.json();
		return dados;
	}

	return {
		httpGet,
	};
}
