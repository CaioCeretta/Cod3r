"use client";

import { useState } from "react";
import type Candidate from "@/data/models/Candidate";

export type CandidateFormProps = {
	candidate: Partial<Candidate>;
	// saveCandidate: (candidate: Candidate) => void;
	cancel?: () => void;
};

export const CandidateForm = (props: CandidateFormProps) => {
	const [candidate, setCandidate] = useState<Partial<Candidate>>(
		props.candidate,
	);

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
				onChange={(e) => setCandidate({ ...candidate, party: e.target.value })}
			/>

			<textarea
				className="input"
				placeholder={candidate.description || "Digite a descrição do candidato"}
				onChange={(e) =>
					setCandidate({ ...candidate, description: e.target.value })
				}
			>
				{candidate.description}
			</textarea>

			<div className="flex gap-3">
				<button type="button" className="botao azul">
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
