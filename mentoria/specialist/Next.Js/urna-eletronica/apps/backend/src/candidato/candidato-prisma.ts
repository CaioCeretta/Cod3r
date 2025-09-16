import { Injectable } from '@nestjs/common';
import { Candidato, RepositorioCandidato } from '@urna/votacao';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class CandidatoPrisma implements RepositorioCandidato {
	constructor(private readonly prisma: PrismaProvider) {}

	async salvar(candidato: Candidato): Promise<void> {
		await this.prisma.candidato.upsert({
			where: { id: candidato.id ?? -1 },
			update: candidato,
			create: candidato,
		});
	}

	obterPorNumero(numero: number): Promise<Candidato | null> {
		return this.prisma.candidato.findUnique({
			where: { numero },
		});
	}
}
