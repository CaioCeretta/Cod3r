"use client";

import { useContext, useState } from "react";
import Page from "@/components/shared/Pagina";
import ContextoAutenticacao from "@/data/contexts/ContextoAutenticacao";

export default function TelaLogin() {
	const { login, cadastrar } = useContext(ContextoAutenticacao);

	const [modo, setModo] = useState<"login" | "cadastro">("login");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [nome, setNome] = useState("");

	function alternarModo() {
		setModo(modo === "login" ? "cadastro" : "login");
	}

	return (
		<div className="flex flex-col justify-center items-center gap-6 h-screen">
			<h1 className="text-3xl font-bold">Seja bem vindo(a)</h1>
			<div className="bg-zinc-900 rounded-lg gap-6 flex flex-col p-7">
				{modo === "cadastro" && (
					<div className="flex flex-col gap-1">
						<span>Nome</span>
						<input
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							type="text"
							className="input"
						/>
					</div>
				)}
				<div className="flex flex-col gap-1">
					<span>E-mail</span>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						className="input"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<span>Senha</span>
					<input
						value={senha ?? ""}
						onChange={(e) => setSenha(e.target.value)}
						type="password"
						className="input"
					/>
				</div>

				<button
					type="button"
					onClick={() => {
						modo === "login"
							? login(email, senha)
							: cadastrar({ email, senha, nome });
					}}
					className="botao azul"
				>
					{modo === "login" ? "Entrar" : "Cadastrar"}
				</button>

				<button type="button" onClick={alternarModo}>
					{modo === "login" ? "Ainda não possui conta?" : "Já possui uma conta"}
				</button>
			</div>
		</div>
	);
}
