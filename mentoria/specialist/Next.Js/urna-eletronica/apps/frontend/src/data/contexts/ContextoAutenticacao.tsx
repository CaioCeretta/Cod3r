`use client`;

import { loginUsuario, type Usuario } from "@urna/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import useAPI from "../hooks/useAPI";

export interface ContextoAutenticacaoProps {
	usuario: Partial<Usuario> | null;
	login: (email: string, senha: string) => Promise<void>;
	cadastrar: (usuario: Partial<Usuario>) => Promise<void>;
	logout: () => void;
}

const ContextoAutenticacao = createContext<ContextoAutenticacaoProps>(
	{} as any,
);

export function ProvedorAutenticacao(props: any) {
	const [usuario, setUsuario] = useState<Partial<Usuario> | null>(null);
	const router = useRouter();

	const { httpGet } = useAPI();

	async function cadastrar(usuario: Partial<Usuario>) {
		const resultado = await httpGet("");

		console.log(resultado);
		alert(resultado);
	}

	async function login(email: string, senha: string) {
		try {
			const usuario = loginUsuario(email, senha);

			setUsuario(usuario);

			router.push("/");
		} catch (e: any) {
			alert(e.message);
		}
	}

	function logout() {
		setUsuario(null);
	}

	return (
		<ContextoAutenticacao.Provider
			value={{
				usuario,
				login,
				cadastrar,
				logout,
			}}
		>
			{props.children}
		</ContextoAutenticacao.Provider>
	);
}

export default ContextoAutenticacao;
