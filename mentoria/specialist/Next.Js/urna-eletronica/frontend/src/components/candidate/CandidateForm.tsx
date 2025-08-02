"use client";

import { useState } from "react";
import type Candidate from "@/data/models/Candidate";

export type CandidateFormProps = {
	candidate: Candidate;
	// saveCandidate: (candidate: Candidate) => void;
};

export const CandidateForm = (props: CandidateFormProps) => {
	const [candidate, setCandidate] = useState<Candidate>(props.candidate);

	return (
		<div>
			<input type="text" />
		</div>
	);
};

export default CandidateForm;
