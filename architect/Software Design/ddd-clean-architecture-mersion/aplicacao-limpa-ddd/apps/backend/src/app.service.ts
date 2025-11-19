import { somar } from "@ddd/shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHello(): string {
		return `${somar(1, 3)}`;
	}
}
