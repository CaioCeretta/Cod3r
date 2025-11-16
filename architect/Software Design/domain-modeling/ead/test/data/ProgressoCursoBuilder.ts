import { faker } from "@faker-js/faker";
import type { ProgressoAulaProps } from "@/progresso/ProgressoAula";
import ProgressoCurso, {
	type ProgressoCursoProps,
} from "@/progresso/ProgressoCurso";
import Id from "@/shared/Id";
import NomesCurso from "./NomesCurso";
import ProgressoAulaBuilder from "./ProgressoAulaBuilder";

export default class ProgressoCursoBuilder {
	private constructor(public props: ProgressoCursoProps) {}

	static criar(qtdeAulas?: number): ProgressoCursoBuilder {
		const aulas = ProgressoAulaBuilder.criarListaCom(qtdeAulas).map(
			(a) => a.props,
		);

		return new ProgressoCursoBuilder({
			id: Id.novo.valor,
			emailUsuario: faker.internet.email(),
			nomeCurso: NomesCurso.aleatorio(),
			data: faker.date.recent(),
			aulaSelecionadaId: aulas[0].id,
			aulas,
		});
	}

	comId(id: string): ProgressoCursoBuilder {
		this.props.id = id;
		return this;
	}

	semId(): ProgressoCursoBuilder {
		this.props.id = undefined;
		return this;
	}

	comEmailUsuario(email: string): ProgressoCursoBuilder {
		this.props.emailUsuario = email;
		return this;
	}

	semEmailUsuario(): ProgressoCursoBuilder {
		this.props.emailUsuario = undefined;
		return this;
	}

	comNomeCurso(nome: string): ProgressoCursoBuilder {
		this.props.nomeCurso = nome;
		return this;
	}

	semNomeCurso(): ProgressoCursoBuilder {
		this.props.nomeCurso = undefined;
		return this;
	}

	comData(data: Date): ProgressoCursoBuilder {
		this.props.data = data;
		return this;
	}

	semData(): ProgressoCursoBuilder {
		this.props.data = undefined;
		return this;
	}

	comAulaSelecionadaId(id: string): ProgressoCursoBuilder {
		this.props.aulaSelecionadaId = id;
		return this;
	}

	semAulaSelecionadaId(): ProgressoCursoBuilder {
		this.props.aulaSelecionadaId = undefined;
		return this;
	}

	comAulas(aulas: ProgressoAulaProps[]): ProgressoCursoBuilder {
		this.props.aulas = [...aulas];
		this.props.aulaSelecionadaId = this.props.aulas[0]?.id;
		return this;
	}

	semAulas(): ProgressoCursoBuilder {
		this.props.aulas = undefined;
		return this;
	}

	agora(): ProgressoCurso {
		return new ProgressoCurso(this.props);
	}
}
