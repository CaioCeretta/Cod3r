"use client";

import { ProvedorAutenticacao } from "@/data/contexts/ContextoAutenticacao";

export default function Layout(props: any) {
	return <ProvedorAutenticacao>{props.children}</ProvedorAutenticacao>;
}
