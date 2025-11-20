export default interface UseCase<IN, OUT> {
	execute(entrada: IN): Promise<OUT>;
}
