import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { loginUsuario, registrarUsuario, Usuario } from '@urna/auth';
import * as jwt from 'jsonwebtoken';
import { BcryptProvider } from './bcrypt.provider';
import { UsuarioPrisma } from './usuario.prisma';

@Controller('auth')
export class AuthController {
	constructor(
		private repo: UsuarioPrisma,
		private cripto: BcryptProvider,
	) {}

	@Post('login')
	async login(@Body() usuarioInformado: Partial<Usuario>) {
		// loginUsuario requires an email and password, so to avoid squiggly lines, add this checking
		if (!usuarioInformado.email || !usuarioInformado.senha) {
			throw new Error('Email e senha são obrigatórios');
		}
		const usuario = await loginUsuario({
			repo: this.repo,
			cripto: this.cripto,
			email: usuarioInformado.email,
			senha: usuarioInformado.senha,
		});
		return {
			...usuario,
			token: jwt.sign(usuario, 'chave', {
				expiresIn: '15d',
			}),
		};
	}

	@Post('registrar')
	async registrar(@Body() usuario: Partial<Usuario>) {
		await registrarUsuario({
			repo: this.repo,
			cripto: this.cripto,
			usuario,
		});
	}

	@Get('usuario/:id')
	async obterPorId(@Param() id: number) {
		const usuario = await this.repo.buscarPorId(id);
		return usuario;
	}
}
