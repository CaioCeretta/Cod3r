"use client";

import { type ChangeEvent, useState } from "react";
import type Candidate from "@/data/models/Candidate";

export type CandidateFormProps = {
	candidate: Partial<Candidate>;
	saveCandidate: (candidate: Partial<Candidate>) => void;
	cancel?: () => void;
};

export const CandidateForm = (props: CandidateFormProps) => {
	const [candidate, setCandidate] = useState<Partial<Candidate>>(
		props.candidate,
	);

	console.log(candidate);

	return (
		<div className="flex flex-col gap-7">
			<h1 className="text-4xl">Formulário de Candidato </h1>
			<input
				type="text"
				className="input"
				placeholder="Digite o nome do candidato"
				value={candidate.name}
				onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
			/>
			<input
				type="number"
				className="input"
				placeholder="Digite o numero do candidato"
				value={candidate.number}
				onChange={(e) =>
					setCandidate({ ...candidate, number: +e.target.value })
				}
			/>
			<input
				type="text"
				className="input"
				placeholder="Digite a descrição do candidato"
				value={candidate.party}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setCandidate({ ...candidate, party: e.target.value })
				}
			/>

			<textarea
				className="input"
				placeholder={candidate.description || "Digite a descrição do candidato"}
				value={candidate.description}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setCandidate({ ...candidate, description: e.target.value })
				}
			/>

			<div className="flex gap-3">
				<button
					type="button"
					className="botao azul"
					onClick={() => props.saveCandidate?.(candidate)}
				>
					Salvar
				</button>
				<button type="button" onClick={props.cancel} className="botao cinza">
					Cancelar
				</button>
			</div>
		</div>
	);
};

export default CandidateForm;
