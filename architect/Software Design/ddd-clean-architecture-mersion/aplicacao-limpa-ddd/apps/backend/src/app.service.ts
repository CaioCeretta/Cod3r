import { Teste } from "@ddd/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	async getHello(): Promise<string> {
		const useCase = new Teste();

		const resposta = await useCase.execute;

		return `Resposta ${resposta}`;
	}
}
