import type { UseCase } from "@ddd/shared";

export default class Teste implements UseCase<void, string> {
	async execute(): Promise<string> {
		return "Caso de uso de teste no módulo de autenticacao";
	}
}
