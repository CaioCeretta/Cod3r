"use client";

import { useState } from "react";
import CandidateForm from "@/components/candidate/CandidateForm";
import CandidatesList from "@/components/candidate/CandidatesList";
import candidatesJSON from "@/data/constants/candidates";
import type Candidate from "@/data/models/Candidate";

export const PageCandidate = () => {
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

	return (
		<div>
			{selectedCandidate ? (
				<CandidateForm
					candidate={selectedCandidate}
					cancel={() => setSelectedCandidate(null)}
				/>
			) : (
				<>
					<button type="button">New Candidate</button>
					<CandidatesList
						deleteCandidate={deleteCandidate}
						candidates={candidates}
						selectCandidate={selectCandidate}
					/>
				</>
			)}
		</div>
	);
};

export default PageCandidate;
