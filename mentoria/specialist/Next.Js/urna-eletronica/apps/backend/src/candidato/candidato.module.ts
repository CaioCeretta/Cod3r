import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CandidatoController } from './candidato.controller';
import { CandidatoPrisma } from './candidato-prisma';

@Module({
	imports: [DbModule],
	controllers: [CandidatoController],
	providers: [CandidatoPrisma],
})
export class CandidatoModule {}
