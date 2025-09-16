import { Body, Controller, Post } from '@nestjs/common';
import { type Candidato, cadastrarCandidato } from '@urna/votacao';
import { CandidatoPrisma } from './candidato-prisma';

@Controller('candidatos')
export class CandidatoController {
	constructor(private readonly repo: CandidatoPrisma) {}

	@Post()
	async cadastrar(@Body() candidato: Candidato) {
		await cadastrarCandidato({
			repo: this.repo,
			candidato,
		});
	}
}
