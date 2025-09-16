import type Candidate from "@/data/models/Candidato";

export interface CandidatesListProps {
	candidates: Candidate[];
	deleteCandidate?: (candidate: Candidate) => void;
	selectCandidate?: (candidate: Candidate) => void;
}

export const CandidatesList = (props: CandidatesListProps) => {
	function renderItens() {
		const components = [];

		for (let i = 0; i < props.candidates.length; i++) {
			const candidate = props.candidates[i];
			components.push(
				<div key={candidate.id} className="bg-zinc-800 p-5 rounded-lg">
					<h2>
						{candidate.name} ({candidate.party})
					</h2>
					<p>{candidate.description}</p>
					<div className="flex py-5 gap-2">
						<button
							onClick={() => props.selectCandidate?.(candidate)}
							className="botao azul my-3"
							type="button"
						>
							Select
						</button>

						<button
							onClick={() => props.deleteCandidate?.(candidate)}
							className="botao vermelho my-3"
							type="button"
						>
							Delete
						</button>
					</div>
				</div>,
			);
		}

		return components;
	}

	return <div className="flex flex-col gap-5">{renderItens()}</div>;
};

export default CandidatesList;
