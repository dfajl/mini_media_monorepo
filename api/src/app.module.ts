import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

/* модуль сборки всего приложения (все модули, которые используются в приложении) */
@Module({
  imports: [
    // Загружает .env в `process.env`, чтобы вы могли читать переменные окружения
    // как обычно через `process.env.*` в вашем коде.
    //
    // Поддержка запуска как из корня репозитория, так и из папки `api`:
    // - при запуске из `api`: возьмёт `api/.env` (то есть `./.env`)
    // - при запуске из корня: возьмёт `api/.env` (то есть `./api/.env`)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), '.env'),
        join(process.cwd(), 'api', '.env'),
      ],
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
  ], // импортируем все модули, которые используются в приложении
  controllers: [AppController], // контроллеры приложения
  providers: [AppService], // сервисы приложения
})
export class AppModule {} // экспортируем модуль приложения
