export default interface Conversor<E, S> {
	converter(entrada: E): S;
}
