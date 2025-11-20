import { faker } from "@faker-js/faker";
import { Erros } from "@/constants/Erros";
import type CursoConcluido from "@/progresso/CursoConcluido";
import type { ProgressoAulaProps } from "@/progresso/ProgressoAula";
import Id from "@/shared/Id";
import ProgressoAulaBuilder from "../data/ProgressoAulaBuilder";
import ProgressoCursoBuilder from "../data/ProgressoCursoBuilder";

const builder = () => ProgressoAulaBuilder.criar().naoIniciado().naoConcluido();
const aulas: ProgressoAulaProps[] = [
	builder().comDuracao(100).agora().props,
	builder().comDuracao(200).agora().props,
	builder().comDuracao(300).agora().props,
	builder().comDuracao(400).agora().props,
	builder().comDuracao(500).agora().props,
];

test("Deve lançar erro ao criar progresso com aulas indefinidas", () => {
	expect(() => {
		ProgressoCursoBuilder.criar().semAulas().agora();
	}).toThrow(Erros.PROGRESSO_CURSO_SEM_AULAS);
});

test("Deve calcular o duração assistida", () => {
	let progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.duracaoAssistida.segundos).toBe(0);

	progresso = progresso.concluirESelecionarProximaAula();
	expect(progresso.duracaoAssistida.segundos).toBe(100);

	progresso = progresso.concluirESelecionarProximaAula();
	expect(progresso.duracaoAssistida.segundos).toBe(300);

	progresso = progresso.concluirESelecionarProximaAula();
	expect(progresso.duracaoAssistida.segundos).toBe(600);
});

test("Deve calcular o duração total", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.duracaoTotal.segundos).toBe(1500);
});

test("Deve calcular o percentual zero de progresso", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.percentualAssistido).toBe(0);
});

test("Deve calcular o percentual de progresso", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.agora()
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula();
	expect(progresso.percentualAssistido).toBe(40);
});

test("Deve concluir a aula atual", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.agora()
		.concluirAulaAtual()
		.concluirAulaAtual();
	expect(progresso.aulas[0].concluido).toBe(true);
	expect(progresso.aulas[1].concluido).toBe(false);
});

test("Deve concluir curso aula por aula", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.percentualAssistido).toBe(0);
	expect(progresso.concluido).toBe(false);

	const progressoConcluido = progresso
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula()
		.concluirESelecionarProximaAula();
	expect(progressoConcluido.percentualAssistido).toBe(100);
	expect(progressoConcluido.concluido).toBe(true);
});

test("Deve concluir curso", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.percentualAssistido).toBe(0);
	expect(progresso.concluido).toBe(false);

	const progressoConcluido = progresso.concluirCurso();
	expect(progressoConcluido.percentualAssistido).toBe(100);
	expect(progressoConcluido.concluido).toBe(true);
});

test("Deve retornar o mesmo curso ao tentar concluir mais de uma vez", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.agora()
		.concluirCurso();
	expect(progresso.concluirAulaAtual()).toBe(progresso);
	expect(progresso.concluirCurso()).toBe(progresso);
});

test("Deve selecionar progresso por id", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	const selecionado = progresso.progressoAula(aulas[2].id!);
	expect(selecionado!.id.valor).toBe(aulas[2].id!);
	expect(progresso.progressoAula("123")).toBeUndefined();
});

test("Deve criar progresso com data indefinida", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.semData()
		.agora();
	expect(progresso.data).toBeDefined();
});

test("Deve criar progresso com aula selecionada", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.comAulaSelecionadaId(aulas[4].id!)
		.agora()
		.concluirAulaAtual();
	expect(progresso.duracaoAssistida.segundos).toBe(500);
});

test("Deve criar progresso sem aula selecionada", () => {
	const progresso = ProgressoCursoBuilder.criar()
		.comAulas(aulas)
		.semAulaSelecionadaId()
		.agora()
		.concluirAulaAtual();
	expect(progresso.duracaoAssistida.segundos).toBe(100);
});

const aulaRisco = (minutos: number, duracaoEmMinutos: number) => {
	return ProgressoAulaBuilder.criar()
		.comDataInicio(new Date(2020, 0, 1, 9, minutos))
		.comDuracao(60 * duracaoEmMinutos)
		.agora().props;
};

test("Deve calcular como risco de fraude como 0%", () => {
	const aulas = [
		aulaRisco(7, 3),
		aulaRisco(8, 5),
		aulaRisco(10, 7),
		aulaRisco(12, 2),
		aulaRisco(13, 1),
	];
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.riscoDeFraude()).toBe(0);
});

test("Deve calcular como risco de fraude como 25%", () => {
	const aulas = [
		aulaRisco(7, 3),
		aulaRisco(8, 5),
		aulaRisco(10, 7),
		aulaRisco(11, 2),
		aulaRisco(13, 1),
	];
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.riscoDeFraude()).toBe(25);
});

test("Deve calcular como risco de fraude como 100%", () => {
	const aulas = [
		aulaRisco(7, 8),
		aulaRisco(8, 12),
		aulaRisco(9, 17),
		aulaRisco(10, 23),
		aulaRisco(11, 9),
	];
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	expect(progresso.riscoDeFraude()).toBe(100);
});

test("Deve calcular como risco de fraude como 0% se curso com uma aula", () => {
	const progresso = ProgressoCursoBuilder.criar(1).agora().concluirCurso();
	expect(progresso.riscoDeFraude()).toBe(0);
});

test("Deve iniciar aula atual", () => {
	const progresso = ProgressoCursoBuilder.criar().comAulas(aulas).agora();
	const novo = progresso.iniciarAulaAtual();
	expect(novo.aulas[0].iniciado).toBeTruthy();
});

test("Deve zerar conclusão de uma aula", () => {
	const progresso = ProgressoCursoBuilder.criar().agora().concluirCurso();
	expect(progresso.concluido).toBeTruthy();

	const novoProgresso = progresso.zerarAula(progresso.aulas[0].id.valor);
	expect(novoProgresso.concluido).toBeFalsy();
	expect(novoProgresso.aulas[0].concluido).toBeFalsy();
});

test("Deve alternar conclusão de uma aula", () => {
	const progresso = ProgressoCursoBuilder.criar().agora().concluirCurso();
	const novoProgresso = progresso.alternarAula(progresso.aulas[0].id.valor);
	expect(novoProgresso.concluido).toBeFalsy();
	expect(novoProgresso.aulas[0].concluido).toBeFalsy();

	const maisNovoProgresso = novoProgresso.alternarAula(
		progresso.aulas[0].id.valor,
	);
	expect(maisNovoProgresso.concluido).toBeTruthy();
	expect(maisNovoProgresso.aulas[0].concluido).toBeTruthy();
});

test("Deve ignorar alternar conclusão de uma aula com id inexistente", () => {
	const progresso = ProgressoCursoBuilder.criar().agora();
	const novoProgresso = progresso.alternarAula("blabla");
	expect(novoProgresso).toBe(progresso);
});

test("Deve notificar conclusão do curso", () => {
	const id = Id.novo.valor;
	const email = faker.internet.email();
	const progresso = ProgressoCursoBuilder.criar()
		.comId(id)
		.comEmailUsuario(email)
		.agora()
		.registrar({
			eventoOcorreu(evento: CursoConcluido) {
				expect(evento.idCurso.valor).toBe(id);
				expect(evento.emailUsuario.valor).toBe(email);
				expect(evento.data).toBeDefined();
			},
		});
	progresso.concluirCurso();
});
