import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthController } from './auth.controller';
import { BcryptProvider } from './bcrypt.provider';
import { UsuarioPrisma } from './usuario.prisma';
import RepositorioUsuarioArray from './usuario-mem.repository';

@Module({
	imports: [DbModule],
	providers: [RepositorioUsuarioArray, BcryptProvider, UsuarioPrisma],
	controllers: [AuthController],
})
export class AuthModule {}
