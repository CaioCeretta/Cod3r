import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('hello')
	getHello(): any {
		return {
			mensagem: 'Ciao, mondo',
		};
	}
}
