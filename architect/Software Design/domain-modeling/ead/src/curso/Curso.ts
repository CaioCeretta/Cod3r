import Duracao from "@/shared/Duracao";
import Entidade, { type EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";
import type { CapituloProps } from "./Capítulo";
import Capitulo from "./Capítulo";

export interface CursoProps extends EntidadeProps {
	nome?: string;
	data?: Date;
	capitulos?: CapituloProps[];
	duracao?: number;
	quantidadeDeAulas?: number;
}

export default class Curso extends Entidade<Curso, CursoProps> {
	readonly nome: NomeSimples;
	readonly data: Date;
	readonly capitulos: Capitulo[];
	readonly duracao: Duracao;
	readonly quantidadeDeAulas: number;

	constructor(props: CursoProps) {
		super({
			...props,
			...Curso.calcularNumerosDoCurso(props),
			data: props.data ?? new Date(),
			capitulos: Curso.ordenarCapitulos(props.capitulos ?? []),
		});

		this.nome = new NomeSimples(this.props.nome!, 3, 50);
		this.data = this.props.data!;
		this.capitulos = this.props.capitulos!.map((c) => new Capitulo(c));
		this.duracao = new Duracao(this.props.duracao);
		this.quantidadeDeAulas = this.props.quantidadeDeAulas!;
	}

	private static calcularNumerosDoCurso(props: CursoProps) {
		if (!props.capitulos) {
			return {
				duracao: props.duracao ?? 0,
				quantidadeDeAulas: props.quantidadeDeAulas ?? 0,
			};
		}

		const capitulos = props.capitulos.map((props) => new Capitulo(props));
		const duracao = capitulos.reduce(
			(total, cap) => total + cap.duracao.segundos,
			0,
		);
		const quantidadeDeAulas = capitulos.reduce(
			(total, cap) => total + cap.quantidadeDeAulas,
			0,
		);

		return { duracao, quantidadeDeAulas };
	}

	private static ordenarCapitulos(
		capitulosProps: CapituloProps[],
	): CapituloProps[] {
		const capitulos = capitulosProps.map((props) => new Capitulo(props));

		const capitulosOrdenados = capitulos.sort(Ordem.ordenar);

		return Curso.reatribuirOrdens(capitulosOrdenados).map((a) => a.props);
	}
	private static reatribuirOrdens(capitulos: Capitulo[]): Capitulo[] {
		return capitulos.map((aula, i) => aula.clone({ ordem: i + 1 }));
	}
}
