import { randomUUID } from "node:crypto";

export default function gerarId(): string {
	return randomUUID();
}
