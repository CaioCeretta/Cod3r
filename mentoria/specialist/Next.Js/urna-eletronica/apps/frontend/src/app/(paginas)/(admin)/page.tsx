"use client";

import { useContext } from "react";
import ContextoAutenticacao from "@/data/contexts/ContextoAutenticacao";

export default function Home() {
	const { usuario } = useContext(ContextoAutenticacao);

	return (
		<div className="flex flex-col">
			<span>{usuario?.nome}</span>
			<span>{usuario?.email}</span>
		</div>
	);
}
