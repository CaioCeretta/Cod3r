import { faker } from "@faker-js/faker";
import CriarProgressoCurso from "@/progresso/CriarProgressoCurso";
import AulaBuilder from "../data/AulaBuilder";
import CapituloBuilder from "../data/CapituloBuilder";
import CursoBuilder from "../data/CursoBuilder";

test("Deve iniciar o progresso com o mesmo número de aulas do curso", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso).novo(faker.internet.email());
	expect(progresso.aulas).toHaveLength(curso.aulas.length);
});

test("Deve iniciar o progresso zerado", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso).novo(faker.internet.email());
	expect(progresso.percentualAssistido).toBe(0);
	expect(progresso.duracaoAssistida.segundos).toBe(0);
});

test("Deve iniciar o progresso com a mesma duração do curso", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso).novo(faker.internet.email());
	expect(progresso.duracaoTotal.segundos).toBe(curso.duracao.segundos);
});

test("Deve sincronizar o progresso com aula alterada", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso)
		.novo(faker.internet.email())
		.iniciarAulaAtual()
		.concluirESelecionarProximaAula()
		.iniciarAulaAtual()
		.concluirESelecionarProximaAula()
		.iniciarAulaAtual()
		.concluirESelecionarProximaAula();

	const novaAula = curso.aulas[0].clone({ duracao: 1000 });
	const novoCurso = curso.atualizarAula(novaAula);

	const progressoNovo = new CriarProgressoCurso(novoCurso).sincronizadoCom(
		progresso,
	);
	expect(progresso.aulas[0].iniciado).toBe(true);
	expect(progressoNovo.aulas[0].iniciado).toBe(false);
	expect(progressoNovo.aulas[0].duracao.segundos).toBe(1000);
});

test("Deve sincronizar o progresso com aula nova", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso).novo(faker.internet.email());

	const novoCurso = curso.adicionarCapitulo(
		CapituloBuilder.criar()
			.comAulas([AulaBuilder.criar().comDuracao(10000).agora()])
			.agora(),
	);

	const progressoNovo = new CriarProgressoCurso(novoCurso).sincronizadoCom(
		progresso,
	);
	expect(novoCurso.duracao.segundos - curso.duracao.segundos).toBe(10000);
	expect(
		progressoNovo.duracaoTotal.segundos - progresso.duracaoTotal.segundos,
	).toBe(10000);
	expect(progressoNovo.aulas.length).toBe(novoCurso.aulas.length);
});

test("Deve limpar data de conclusão do progresso com curso alterado", () => {
	const curso = CursoBuilder.criar().agora();
	const progresso = new CriarProgressoCurso(curso)
		.novo(faker.internet.email())
		.concluirCurso();

	const aulaAlterada = curso.aulas[3].clone({ duracao: 10000 });
	const cursoAlterado = curso.atualizarAula(aulaAlterada);
	const progressoAlterado = new CriarProgressoCurso(
		cursoAlterado,
	).sincronizadoCom(progresso);

	expect(progresso.dataConclusao).toBeDefined();
	expect(progresso.aulas[2].concluido).toBeTruthy();
	expect(progresso.aulas[3].concluido).toBeTruthy();
	expect(progressoAlterado.dataConclusao).toBeUndefined();
	expect(progressoAlterado.aulas[2].concluido).toBeTruthy();
	expect(progressoAlterado.aulas[3].concluido).toBeFalsy();
});
