import { Erros } from "@/constants/Erros";
import Curso from "@/curso/Curso";
import Id from "@/shared/Id";
import AulaBuilder from "../data/AulaBuilder";
import CapituloBuilder from "../data/CapituloBuilder";
import CursoBuilder from "../data/CursoBuilder";
import NomesCurso from "../data/NomesCurso";

test("Deve criar um curso com um novo id", () => {
	const curso = CursoBuilder.criar().semId().agora();
	expect(curso.id.valor).not.toBeNull();
});

test("Deve lançar erro ao tentar criar curso sem nome", () => {
	expect(() => CursoBuilder.criar().semNome().agora()).toThrow(
		Erros.NOME_VAZIO,
	);
});

test("Deve lançar erro ao tentar criar curso sem duração e capitulos", () => {
	expect(() =>
		CursoBuilder.criar().semDuracao().semCapitulos().agora(),
	).toThrow(Erros.CURSO_SEM_DURACAO);
});

test("Deve lançar erro ao tentar criar curso sem qtdeDeAulas e capitulos", () => {
	expect(() =>
		CursoBuilder.criar()
			.semQuantidadeDeAulas()
			.comDuracao(100)
			.semCapitulos()
			.agora(),
	).toThrow(Erros.CURSO_SEM_AULAS);
});

test("Deve calcular duração do curso", () => {
	const aulas = [
		AulaBuilder.criar("Aula #1").comDuracao(63).comOrdem(1).agora(),
		AulaBuilder.criar("Aula #2").comDuracao(1007).comOrdem(2).agora(),
		AulaBuilder.criar("Aula #3").comDuracao(3784).comOrdem(3).agora(),
	];

	const cap = CapituloBuilder.criar().comAulas(aulas).agora();
	const curso = CursoBuilder.criar()
		.comCapitulos([
			cap,
			cap.clone({ id: Id.novo.valor }),
			cap.clone({ id: Id.novo.valor }),
		])
		.agora();

	expect(curso.props.duracao).toBe(14562);
	expect(curso.duracao.segundos).toBe(14562);
	expect(curso.duracao.hms).toBe("04h 02m 42s");
});

test("Deve criar curso sem capítulos e manter duração e qtde de aulas", () => {
	const curso = CursoBuilder.criar()
		.semCapitulos()
		.comDuracao(60 * 58)
		.comQuantidadeDeAulas(45)
		.agora();
	expect(curso.capitulos).toHaveLength(0);
	expect(curso.duracao.hm).toBe("58m");
	expect(curso.quantidadeDeAulas).toBe(45);
});

test("Deve recalcular duração e qtde de aulas quando tiver capítulos", () => {
	const curso = CursoBuilder.criar(10, 20)
		.comDuracao(60 * 58)
		.comQuantidadeDeAulas(45)
		.agora();
	expect(curso.quantidadeDeAulas).toBe(200);
	expect(curso.duracao.segundos).toBeGreaterThan(0);
});

test("Deve calcular ordem corretamente", () => {
	const capitulos = [
		CapituloBuilder.criar().comOrdem(1).agora(),
		CapituloBuilder.criar().comOrdem(1).agora(),
		CapituloBuilder.criar().comOrdem(1).agora(),
	];
	const curso = CursoBuilder.criar().comCapitulos(capitulos).agora();
	expect(curso.capitulos[0].ordem.valor).toBe(1);
	expect(curso.capitulos[1].ordem.valor).toBe(2);
	expect(curso.capitulos[2].ordem.valor).toBe(3);
});

test("Deve criar curso com capitulos undefined", () => {
	const curso = new Curso({
		nome: NomesCurso.aleatorio(),
		duracao: 100,
		quantidadeDeAulas: 10,
		capitulos: undefined,
	});

	expect(curso.capitulos).toHaveLength(0);
});

test("Deve lançar erro ao criar capítulo sem aula", () => {
	expect(
		() =>
			new Curso({
				nome: NomesCurso.aleatorio(),
				duracao: 100,
				quantidadeDeAulas: 1,
				capitulos: [{ nome: "Capítulo 1", ordem: 1, aulas: undefined }],
			}),
	).toThrow(Erros.CAPITULO_SEM_AULAS);
});

test("Deve adicionar capitulo", () => {
	const curso = CursoBuilder.criar().agora();
	const novoCapitulo = CapituloBuilder.criar().agora();
	const novoCurso = curso.adicionarCapitulo(novoCapitulo);
	expect(novoCurso.ultimoCapitulo.nome.completo).toBe(
		novoCapitulo.nome.completo,
	);
});

test("Deve adicionar capítulo no início do curso", () => {
	const curso = CursoBuilder.criar().agora();
	const novoCapitulo = CapituloBuilder.criar().agora();
	const novoCurso = curso.adicionarCapitulo(novoCapitulo, 0);
	expect(novoCurso.primeiroCapitulo.nome.completo).toBe(
		novoCapitulo.nome.completo,
	);
});

test("Deve remover capitulo", () => {
	const curso = CursoBuilder.criar().agora();
	const segundoCapitulo = curso.capitulos[1];
	const novoCurso = curso.removerCapitulo(segundoCapitulo);
	expect(novoCurso.capitulos.length).toBe(curso.capitulos.length - 1);
});

test("Deve mover capítulo uma posição para baixo", () => {
	const curso = CursoBuilder.criar().agora();
	const segundoCapitulo = curso.capitulos[1];
	const novoCurso = curso.moverCapituloParaBaixo(segundoCapitulo);
	expect(novoCurso.capitulos[2].nome.completo).toBe(
		segundoCapitulo.nome.completo,
	);
});

test("Deve mover capítulo uma posição para cima", () => {
	const curso = CursoBuilder.criar().agora();
	const segundoCapitulo = curso.capitulos[1];
	const novoCurso = curso.moverCapituloParaCima(segundoCapitulo);
	expect(novoCurso.primeiroCapitulo.nome.completo).toBe(
		segundoCapitulo.nome.completo,
	);
});

test("Deve ignorar quando mover primeiro capítulo para cima", () => {
	const curso = CursoBuilder.criar().agora();
	const novoCurso = curso.moverCapituloParaCima(curso.primeiroCapitulo);
	expect(novoCurso).toBe(curso);
});

test("Deve ignorar quando mover último capítulo para baixo", () => {
	const curso = CursoBuilder.criar().agora();
	const novoCurso = curso.moverCapituloParaBaixo(curso.ultimoCapitulo);
	expect(novoCurso).toBe(curso);
});

test("Deve atualizar aula no curso", () => {
	const curso = CursoBuilder.criar().agora();
	const novaAula = curso.primeiroCapitulo.primeiraAula.clone({
		duracao: 10000,
	});
	const novoCurso = curso.atualizarAula(novaAula);
	expect(novoCurso.capitulos[0].aulas[0].nome.completo).toBe(
		novaAula.nome.completo,
	);
	expect(novoCurso.capitulos[0].aulas[0].duracao.segundos).toBe(
		novaAula.duracao.segundos,
	);
});
