"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useContext, useEffect } from "react";
import ContextoAutenticacao from "@/data/contexts/ContextoAutenticacao";

export type ForcarUsuarioLogadoProps = {};

export const ForcarUsuarioLogado = ({ children }: { children: ReactNode }) => {
	const { usuario } = useContext(ContextoAutenticacao);
	const router = useRouter();

	useEffect(() => {
		if (usuario === null) {
			return router.push("/auth");
		}
	}, [usuario, router]);

	return usuario ? children : null;
};

export default ForcarUsuarioLogado;
