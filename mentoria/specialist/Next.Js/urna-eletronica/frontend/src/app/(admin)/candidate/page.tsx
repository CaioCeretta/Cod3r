"use client";

import CandidatesList from "@/components/candidate/CandidatesList";
import candidatesJSON from "@/data/constants/candidates";
import type Candidate from "@/data/models/Candidate";
import { useState } from "react";

export const PageCandidate = () => {
	const [candidates, setCandidates] = useState<Candidate[]>(candidatesJSON);

	function deleteCandidate(candidate: Candidate) {
		const remainingCandidates = candidates.filter((c) => candidate !== c);
		setCandidates(remainingCandidates);
	}

	return (
		<div>
			{/* <button
				type="button"
				className="cursor-pointer"
				onClick={deleteFirstCandidate}
			>
				Delete First
			</button> */}
			<button type="button">New Candidate</button>
			<CandidatesList
				deleteCandidate={deleteCandidate}
				candidates={candidates}
			/>
		</div>
	);
};

export default PageCandidate;
