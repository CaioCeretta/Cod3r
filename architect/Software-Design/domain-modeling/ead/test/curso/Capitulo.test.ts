import { Erros } from "@/constants/Erros";
import AulaBuilder from "../data/AulaBuilder";
import CapituloBuilder from "../data/CapituloBuilder";

test("Deve lançar erro ao tentar criar capítulo sem nome", () => {
	expect(() => CapituloBuilder.criar().semNome().agora()).toThrow(
		Erros.NOME_VAZIO,
	);
});

test("Deve lançar erro ao tentar criar capítulo sem aulas", () => {
	expect(() => CapituloBuilder.criar().semAulas().agora()).toThrow(
		Erros.CAPITULO_SEM_AULAS,
	);
});

test("Deve possuir ordem padrão como 1", () => {
	const cap = CapituloBuilder.criar().semOrdem().agora();
	expect(cap.ordem.valor).toBe(1);
});

test("Deve lançar erro ao tentar criar capítulo com ordem negativa ou zero", () => {
	expect(() => CapituloBuilder.criar().comOrdem(0).agora()).toThrow(
		Erros.ORDEM_INVALIDA,
	);
	expect(() => CapituloBuilder.criar().comOrdem(-10).agora()).toThrow(
		Erros.ORDEM_INVALIDA,
	);
});

test("Deve calcular duração do capítulo", () => {
	const aulas = [
		AulaBuilder.criar("Aula #1").comDuracao(63).comOrdem(1).agora(),
		AulaBuilder.criar("Aula #2").comDuracao(1007).comOrdem(2).agora(),
		AulaBuilder.criar("Aula #3").comDuracao(3784).comOrdem(3).agora(),
	];
	const cap = CapituloBuilder.criar().comAulas(aulas).agora();
	expect(cap.duracao.segundos).toBe(4854);
	expect(cap.duracao.hm).toBe("01h 20m");
});

test("Deve calcular a ordem corretamente", () => {
	const aulas = [
		AulaBuilder.criar("Aula #1").comDuracao(63).semOrdem().agora(),
		AulaBuilder.criar("Aula #2").comDuracao(1007).semOrdem().agora(),
		AulaBuilder.criar("Aula #3").comDuracao(3784).semOrdem().agora(),
	];

	const cap = CapituloBuilder.criar().comAulas(aulas).agora();
	expect(cap.aulas[0].ordem.valor).toBe(1);
	expect(cap.aulas[1].ordem.valor).toBe(2);
	expect(cap.aulas[2].ordem.valor).toBe(3);
});

test("Deve calcular a ordem corretamente nas props", () => {
	const aulas = [
		AulaBuilder.criar("Aula #1").comDuracao(63).semOrdem().agora(),
		AulaBuilder.criar("Aula #2").comDuracao(1007).semOrdem().agora(),
		AulaBuilder.criar("Aula #3").comDuracao(3784).semOrdem().agora(),
	];

	const cap = CapituloBuilder.criar().comAulas(aulas).agora();
	expect(cap.props.aulas![0].ordem).toBe(1);
	expect(cap.props.aulas![1].ordem).toBe(2);
	expect(cap.props.aulas![2].ordem).toBe(3);
});

test("Deve retornar a quantidade de aulas", () => {
	const capitulo = CapituloBuilder.criar(15).agora();
	expect(capitulo.quantidadeDeAulas).toBe(15);
});

test("Deve retornar primeira e última aula", () => {
	const aulas = [
		AulaBuilder.criar("Aula #2").comDuracao(1007).comOrdem(2).agora(),
		AulaBuilder.criar("Aula #3").comDuracao(3784).comOrdem(3).agora(),
		AulaBuilder.criar("Aula #1").comDuracao(63).comOrdem(1).agora(),
	];
	const capitulo = CapituloBuilder.criar().comAulas(aulas).agora();
	expect(capitulo.primeiraAula.nome.completo).toBe("Aula #1");
	expect(capitulo.ultimaAula.ordem.valor).toBe(3);
});

test("Deve adicionar aula", () => {
	const capitulo = CapituloBuilder.criar(3).agora();
	const novaAula = AulaBuilder.criar("Aula #4").agora();
	const novoCapitulo = capitulo.adicionarAula(novaAula);
	expect(novoCapitulo.ultimaAula.nome.completo).toBe(novaAula.nome.completo);
	expect(novoCapitulo.quantidadeDeAulas).toBe(4);
});

test("Deve adicionar aula no início do capítulo", () => {
	const capitulo = CapituloBuilder.criar(3).agora();
	const novaAula = AulaBuilder.criar("Bem vindos").agora();
	const novoCapitulo = capitulo.adicionarAula(novaAula, 0);
	expect(novoCapitulo.primeiraAula.nome.completo).toBe(novaAula.nome.completo);
	expect(novoCapitulo.quantidadeDeAulas).toBe(4);
});

test("Deve remover aula", () => {
	const cap = CapituloBuilder.criar(5).agora();
	const segundaAula = cap.aulas[1];
	const novoCap = cap.removerAula(segundaAula);
	expect(novoCap.quantidadeDeAulas).toBe(4);
});

test("Deve mover aula uma posição para baixo", () => {
	const cap = CapituloBuilder.criar().agora();
	const segundaAula = cap.aulas[1];
	const novoCap = cap.moverAulaParaBaixo(segundaAula);
	expect(novoCap.aulas[2].nome.completo).toBe(segundaAula.nome.completo);
});

test("Deve mover aula uma posição para cima", () => {
	const cap = CapituloBuilder.criar().agora();
	const segundaAula = cap.aulas[1];
	const novoCap = cap.moverAulaParaCima(segundaAula);
	expect(novoCap.aulas[0].nome.completo).toBe(segundaAula.nome.completo);
});

test("Deve ignorar quando mover primeira aula para cima", () => {
	const cap = CapituloBuilder.criar().agora();
	const novoCap = cap.moverAulaParaCima(cap.primeiraAula);
	expect(novoCap).toBe(cap);
});

test("Deve ignorar quando mover última aula para baixo", () => {
	const cap = CapituloBuilder.criar().agora();
	const novoCap = cap.moverAulaParaBaixo(cap.ultimaAula);
	expect(novoCap).toBe(cap);
});
