import { Injectable } from '@nestjs/common';
import { RepositorioUsuario, Usuario } from '@urna/auth';
import { PrismaProvider } from 'src/db/prisma.provider';

@Injectable()
export class UsuarioPrisma implements RepositorioUsuario {
	constructor(private readonly prisma: PrismaProvider) {}

	buscarPorEmail(email: string): Promise<Usuario | null> {
		return this.prisma.usuario.findUnique({
			where: {
				email,
			},
		});
	}

	buscarPorId(id: number): Promise<Usuario | null> {
		return this.prisma.usuario.findUnique({
			where: { id },
		});
	}

	async salvar(usuario: Usuario): Promise<void> {
		await this.prisma.usuario.upsert({
			where: { id: usuario.id ?? -1 },
			update: usuario,
			create: usuario,
		});
	}
}
