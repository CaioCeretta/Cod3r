import type Candidate from "@/data/models/Candidate"

export interface CandidatesListProps {
  candidates: Candidate[]
}

export const CandidatesList = (props: CandidatesListProps) => {

  function deleteCandidate(candidate: Candidate) {
    alert(candidate.name)
  }

  function renderItens() {
      const components = []

      for(let i = 0; i < props.candidates.length; i++) {
        const candidate = props.candidates[i]
        components.push(
          <div key={candidate.id} className="bg-zinc-800 p-5 rounded-lg">
            <h2>{candidate.name} ({candidate.party})</h2>
            <p>{candidate.description}</p>
            <div><button onClick={() => deleteCandidate(candidate)} className="botao vermelho my-3" type="button">Delete Candidate</button></div>
          </div>
        )
      }

      return components
  }

  return (
    <div className="flex flex-col gap-5">
      {renderItens()}
    </div>
  )
}

export default CandidatesList