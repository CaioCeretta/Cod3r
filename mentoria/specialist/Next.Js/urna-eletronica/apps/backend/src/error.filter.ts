import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status = exception.status ? exception.status : 500;

		response.status(status).json({
			status,
			data: new Date().toISOString(),
			url: ctx.getRequest().url,
			message: exception.message ?? 'Ocorreu um erro inesperado',
		});

		console.log('Passou por aqui');
	}
}
