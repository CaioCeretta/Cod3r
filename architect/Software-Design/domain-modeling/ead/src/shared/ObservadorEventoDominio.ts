import type EventoDominio from "./EventoDominio";

export default interface ObservadorEventoDominio<E extends EventoDominio> {
	eventoOcorreu(evento: E): void;
}
