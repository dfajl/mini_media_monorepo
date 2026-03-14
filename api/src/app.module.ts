import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

/* модуль сборки всего приложения (все модули, которые используются в приложении) */
@Module({
  imports: [EventEmitterModule.forRoot(), AuthModule], // импортируем все модули, которые используются в приложении
  controllers: [AppController], // контроллеры приложения
  providers: [AppService], // сервисы приложения
})
export class AppModule {} // экспортируем модуль приложения
