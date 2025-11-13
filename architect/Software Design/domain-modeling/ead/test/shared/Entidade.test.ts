import Entidade, { type EntidadeProps } from "@/shared/Entidade";
import Id from "@/shared/Id";

interface EntidadeTesteProps extends EntidadeProps {
	nome?: string;
	idade?: number;
}

class EntidadeTeste extends Entidade<EntidadeTeste, EntidadeTesteProps> {
	constructor(props: EntidadeTesteProps) {
		super(props);
	}
}

test("Deve calcular igualdade para true quando as entidades possuem o mesmo id", () => {
	const id = Id.novo.valor;
	const entidade1 = new EntidadeTeste({ id });
	const entidade2 = new EntidadeTeste({ id });
	expect(entidade1.igual(entidade2)).toBeTruthy();
});

test("Deve calcular igualdade para false quando as entidades possuem ids diferentes", () => {
	const id1 = Id.novo.valor;
	const id2 = Id.novo.valor;
	const entidade1 = new EntidadeTeste({ id: id1 });
	const entidade2 = new EntidadeTeste({ id: id2 });
	expect(entidade1.igual(entidade2)).toBe(false);
	expect(entidade1.diferente(entidade2)).toBe(true);
});

test("Deve clonar uma entidade", () => {
	const entidade = new EntidadeTeste({
		id: Id.novo.valor,
		nome: "Claudio",
		idade: 20,
	});
	const clone = entidade.clone({ idade: 30 });

	expect(clone.id.valor).toBe(entidade.id.valor);
	expect(clone.props.nome).toBe(entidade.props.nome);
	expect(clone.props.idade).toBe(30);
});
