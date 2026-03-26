import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthEventsListener } from './auth-events.listener';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [AuthService, AuthEventsListener],
})
// NestJS модули описываются классами: даже если “тело” класса пустое,
// скобки нужны синтаксически, чтобы указать, что это полноценный класс
// (метаданные берутся из декоратора `@Module(...)`, а не из содержимого `{}`).
export class AuthModule {}
