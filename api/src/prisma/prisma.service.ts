import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable() // делает класс доступным для DI NestJS
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set (required for Prisma).');
    }

    // Prisma 7 (classic) требует “adapter” для прямого подключения.
    // Для PostgreSQL используем адаптер `@prisma/adapter-pg`.
    const adapter = new PrismaPg({
      connectionString,
    });

    // вызываем конструктор PrismaClient с adapter
    super({ adapter });
  }

  // интерфейсы “хуков”: Nest вызовет методы при старте/остановке модуля.
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
