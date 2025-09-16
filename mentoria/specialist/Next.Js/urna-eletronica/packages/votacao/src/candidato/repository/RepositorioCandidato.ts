import type Candidato from '../model/Candidato';

export default interface RepositorioCandidato {
	salvar(candidato: Candidato): Promise<void>;
	obterPorNumero(numero: number): Promise<Candidato | null>;
}
