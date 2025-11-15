import { faker } from "@faker-js/faker";
import Aula, { type AulaProps } from "@/curso/Aula";
import Capitulo, { type CapituloProps } from "@/curso/Capítulo";
import AulaBuilder from "./AulaBuilder";
import NomesCapitulo from "./NomesCapitulo";

export default class CapituloBuilder {
	private constructor(private props: CapituloProps) {}

	static criar(qtdeAulas: number = 10): CapituloBuilder {
		return new CapituloBuilder({
			nome: NomesCapitulo.aleatorio(),
			ordem: faker.number.int({ min: 1, max: 100 }),
			aulas: AulaBuilder.criarListaCom(qtdeAulas).map((a) => a.props),
		});
	}

	static criarListaCom(qtdeCapitulos: number, qtdeAulas: number): Capitulo[] {
		const capitulo = (i: number) =>
			CapituloBuilder.criar(qtdeAulas)
				.comOrdem(i + 1)
				.agora();
		return Array.from({ length: qtdeCapitulos }).map((_, i) => capitulo(i));
	}

	comId(id: string): CapituloBuilder {
		this.props.id = id;
		return this;
	}

	comNome(nome: string): CapituloBuilder {
		this.props.nome = nome;
		return this;
	}

	semNome(): CapituloBuilder {
		this.props.nome = undefined;
		return this;
	}

	comOrdem(ordem: number): CapituloBuilder {
		this.props.ordem = ordem;
		return this;
	}

	semOrdem(): CapituloBuilder {
		this.props.ordem = undefined;
		return this;
	}

	comAulas(aulas: (Aula | AulaProps)[]): CapituloBuilder {
		this.props.aulas = aulas.map((a) => (a instanceof Aula ? a.props : a));
		return this;
	}

	semAulas(): CapituloBuilder {
		this.props.aulas = undefined;
		return this;
	}

	agora(): Capitulo {
		return new Capitulo(this.props);
	}
}
