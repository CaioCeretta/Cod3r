import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	onModuleInit() {
		this.$connect();
	}
	onModuleDestroy() {
		this.$disconnect();
	}
}
