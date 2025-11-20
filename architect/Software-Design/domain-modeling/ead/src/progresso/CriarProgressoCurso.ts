import type Curso from "@/curso/Curso";
import ProgressoCurso from "./ProgressoCurso";

export default class CriarProgressoCurso {
	constructor(readonly curso: Curso) {}

	novo(email: string): ProgressoCurso {
		return this.criar(undefined, email);
	}

	sincronizadoCom(progressoAtual: ProgressoCurso): ProgressoCurso {
		return this.criar(progressoAtual, undefined);
	}

	private criar(progressoAtual?: ProgressoCurso, email?: string) {
		const aulasAlteradas: boolean[] = [];
		const progresso = new ProgressoCurso({
			id: this.curso.id.valor,
			emailUsuario: progressoAtual?.emailUsuario.valor ?? email,
			nomeCurso: this.curso.nome.completo,
			data: progressoAtual?.data ?? new Date(),
			dataConclusao: progressoAtual?.dataConclusao ?? undefined,
			aulaSelecionadaId: progressoAtual?.aulaSelecionada.id.valor ?? undefined,
			aulas: this.curso.aulas.map((a) => {
				const progAula = progressoAtual?.progressoAula(a.id.valor);
				const aulaAlterada = progAula?.duracao.diferente(a.duracao) ?? true;
				aulasAlteradas.push(aulaAlterada);
				return {
					id: a.id.valor,
					nomeAula: a.nome.completo,
					dataInicio: aulaAlterada ? undefined : progAula?.dataInicio,
					dataConclusao: aulaAlterada ? undefined : progAula?.dataConclusao,
					duracao: a.duracao.segundos,
				};
			}),
		});

		const cursoFoiModificado = aulasAlteradas.some((a) => a);

		if (cursoFoiModificado && progresso.dataConclusao) {
			return progresso.clone({ dataConclusao: undefined });
		} else {
			return progresso;
		}
	}
}
