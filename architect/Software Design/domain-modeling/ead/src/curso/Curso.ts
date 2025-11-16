import { Erros } from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";
import Duracao from "@/shared/Duracao";
import Entidade, { type EntidadeProps } from "@/shared/Entidade";
import NomeSimples from "@/shared/NomeSimples";
import Ordem from "@/shared/Ordem";
import type Aula from "./Aula";
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

		const { duracao, quantidadeDeAulas } = this.props;
		if (duracao! <= 0) {
			ErroValidacao.lancar(Erros.CURSO_SEM_DURACAO, duracao);
		}

		if (quantidadeDeAulas! <= 0) {
			ErroValidacao.lancar(Erros.CURSO_SEM_AULAS, quantidadeDeAulas);
		}
	}

	atualizarAula(selecionada: Aula): Curso {
		const capitulos = this.capitulos.map((c) => {
			const aulas = c.aulas.map((a) =>
				a.igual(selecionada) ? selecionada : a,
			);
			return { ...c.props, aulas: aulas.map((a) => a.props) } as CapituloProps;
		});

		return this.clone({ capitulos });
	}

	removerCapitulo(selecionado: Capitulo): Curso {
		const outrosCapitulos = this.capitulos.filter((c) =>
			c.diferente(selecionado),
		);
		const capitulos = Curso.reatribuirOrdens(outrosCapitulos).map(
			(c) => c.props,
		);
		return this.clone({ capitulos });
	}

	moverCapitulo(selecionado: Capitulo, posicao: number): Curso {
		return this.removerCapitulo(selecionado).adicionarCapitulo(
			selecionado,
			posicao,
		);
	}

	moverCapituloParaCima(selecionado: Capitulo): Curso {
		const posicao = this.capitulos.findIndex((c) => c.igual(selecionado));
		const primeiro = posicao === 0;
		return primeiro ? this : this.moverCapitulo(selecionado, posicao - 1);
	}

	moverCapituloParaBaixo(selecionado: Capitulo): Curso {
		const posicao = this.capitulos.findIndex((a) => a.igual(selecionado));
		const ultimo = posicao === this.capitulos.length - 1;
		return ultimo ? this : this.moverCapitulo(selecionado, posicao + 1);
	}

	adicionarCapitulo(capitulo: Capitulo, posicao?: number): Curso {
		const atuais = this.capitulos;
		const novosCapitulos =
			posicao !== undefined
				? [...atuais.slice(0, posicao), capitulo, ...atuais.slice(posicao)]
				: [...atuais, capitulo];
		const capitulos = Curso.reatribuirOrdens(novosCapitulos).map(
			(a) => a.props,
		);
		return this.clone({ capitulos });
	}

	get aulas(): Aula[] {
		return this.capitulos.flatMap((c) => c.aulas);
	}

	get primeiroCapitulo() {
		return this.capitulos[0];
	}

	get ultimoCapitulo() {
		return this.capitulos[this.capitulos.length - 1];
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
