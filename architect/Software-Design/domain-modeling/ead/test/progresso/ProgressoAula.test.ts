import { Erros } from "@/constants/Erros";
import ProgressoAulaBuilder from "../data/ProgressoAulaBuilder";

test("Deve retornar concluído como true mesmo quando não iniciado", () => {
	const progresso = ProgressoAulaBuilder.criar()
		.naoIniciado()
		.concluido()
		.agora();
	expect(progresso.concluido).toBeTruthy();
});

test("Deve concluir progresso sem iniciar progresso", () => {
	const progresso = ProgressoAulaBuilder.criar()
		.naoIniciado()
		.naoConcluido()
		.agora();
	const progressoConcluido = progresso.concluir();
	const dtConclusao = progressoConcluido.dataConclusao!.getTime();
	const dtAtual = new Date().getTime();
	expect(progressoConcluido.iniciado).toBeFalsy();
	expect(progressoConcluido.concluido).toBeTruthy();
	expect(dtAtual - dtConclusao).toBeLessThan(3000);
});

test("Deve concluir progresso com progresso iniciado", () => {
	const progresso = ProgressoAulaBuilder.criar()
		.iniciado()
		.naoConcluido()
		.agora();
	const progressoConcluido = progresso.concluir();
	expect(progressoConcluido.iniciado).toBeTruthy();
	expect(progressoConcluido.concluido).toBeTruthy();
});

test("Deve lançar erro quando nome da aula for indefinido", () => {
	expect(() => ProgressoAulaBuilder.criar().semNomeAula().agora()).toThrow(
		Erros.NOME_VAZIO,
	);
});

test("Deve lançar erro quando id for undefined", () => {
	expect(() => ProgressoAulaBuilder.criar().semId().agora()).toThrow(
		Erros.ID_INVALIDO,
	);
});

test("Deve lançar erro quando duração for zerada", () => {
	expect(() => ProgressoAulaBuilder.criar().comDuracao(0).agora()).toThrow(
		Erros.DURACAO_ZERADA,
	);
});

test("Deve lançar erro quando duração for negativa", () => {
	expect(() => ProgressoAulaBuilder.criar().comDuracao(-10).agora()).toThrow(
		Erros.DURACAO_NEGATIVA,
	);
});

test("Deve iniciar o progresso da aula", () => {
	const progresso = ProgressoAulaBuilder.criar()
		.naoIniciado()
		.naoConcluido()
		.agora();
	const novo = progresso.iniciar();
	expect(novo.dataInicio).toBeDefined();
	expect(novo.iniciado).toBe(true);
	expect(novo.dataConclusao).toBeUndefined();
	expect(novo.concluido).toBe(false);
});

test("Deve zerar o progresso da aula", () => {
	const progresso = ProgressoAulaBuilder.criar().iniciado().concluido().agora();
	expect(progresso.dataConclusao).toBeDefined();
	expect(progresso.concluido).toBe(true);

	const novo = progresso.zerar();
	expect(novo.dataInicio).toBeDefined();
	expect(novo.iniciado).toBe(true);
	expect(novo.dataConclusao).toBeUndefined();
	expect(novo.concluido).toBe(false);
});
