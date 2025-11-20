export default interface CasoDeUso<IN, OUT> {
	executar(dto: IN): Promise<OUT>;
}
