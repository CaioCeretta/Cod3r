import type Candidato from '../model/Candidato';
import type RepositorioCandidato from '../repository/RepositorioCandidato';

export default async function cadastrarCandidato(props: {
	repo: RepositorioCandidato;
	candidato: Partial<Candidato>;
}) {
	const { repo, candidato } = props;

	const candidatoExistente = await repo.obterPorNumero(candidato.numero);

	if (candidatoExistente) throw new Error('Candidato já existente');

	/**
	 * If the user pass from that verification, it will save it as a full user, imagining that eventually all the validations
	 * were executed, these validations could be made before, but for educational purposes they won't
	 */

	//Validate candidate
	await repo.salvar(candidato as Candidato);
}
