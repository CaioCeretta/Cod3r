interface Candidato {
    id: number;
    numero: number;
    descricao: string;
    nome: string;
    partido: string;
    imagemUrl: string;
}

interface RepositorioCandidato {
    salvar(candidato: Candidato): Promise<void>;
    obterPorNumero(numero: number): Promise<Candidato | null>;
}

declare function cadastrarCandidato(props: {
    repo: RepositorioCandidato;
    candidato: Partial<Candidato>;
}): Promise<void>;

export { type Candidato, type RepositorioCandidato, cadastrarCandidato };
