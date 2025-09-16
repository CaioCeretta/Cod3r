import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import RepositorioUsuarioArray from './auth/usuario-mem.repository';
import { DbModule } from './db/db.module';
import { CandidatoModule } from './candidato/candidato.module';

@Module({
	imports: [AuthModule, DbModule, CandidatoModule],
	controllers: [AppController],
})
export class AppModule {}
