"use client";

import { useState } from "react";
import ForcarUsuarioLogado from "@/components/auth/forcar-usuario-logado";
import CandidateForm from "@/components/candidato/CandidateForm";
import CandidatesList from "@/components/candidato/CandidatesList";
import candidatesJSON from "@/data/constants/candidates";
import type Candidate from "@/data/models/Candidato";

export const PageCandidato = () => {
	const [candidates, setCandidates] = useState<Candidate[]>(candidatesJSON);
	const [selectedCandidate, setSelectedCandidate] =
		useState<Partial<Candidate> | null>(null);

	function deleteCandidate(candidate: Candidate) {
		const remainingCandidates = candidates.filter((c) => candidate !== c);
		setCandidates(remainingCandidates);
	}

	function selectCandidate(candidate: Candidate) {
		setSelectedCandidate(candidate);
	}

	function saveCandidate(candidate: Partial<Candidate>) {
		if (candidate.id) {
			setCandidates(
				candidates.map((c) => {
					return c.id === candidate.id ? (candidate as Candidate) : c;
				}),
			);
		} else {
			const id = Math.random();
			setCandidates([...candidates, { ...candidate, id } as Candidate]);
		}

		setSelectedCandidate(null);
	}

	return (
		<ForcarUsuarioLogado>
			{selectedCandidate ? (
				<CandidateForm
					candidate={selectedCandidate}
					saveCandidate={saveCandidate}
					cancel={() => setSelectedCandidate(null)}
				/>
			) : (
				<div className="flex flex-col gap-5">
					<button
						onClick={() => setSelectedCandidate({})}
						type="button"
						className="botao azul self-end"
					>
						New Candidate
					</button>
					<CandidatesList
						deleteCandidate={deleteCandidate}
						candidates={candidates}
						selectCandidate={selectCandidate}
					/>
				</div>
			)}
		</ForcarUsuarioLogado>
	);
};

export default PageCandidato;
