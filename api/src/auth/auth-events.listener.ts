import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as authEvents from './events/auth.events';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthEventsListener {
  private readonly logger = new Logger(AuthEventsListener.name);

  constructor(private readonly prisma: PrismaService) {}

  @OnEvent(authEvents.AUTH_LOGIN_SUCCESS_EVENT)
  async handleLoginSuccess(event: authEvents.AuthLoginSuccessEvent) {
    // Дополнительная проверка: метод действительно вызван именно как обработчик события
    this.logger.debug(
      `handleLoginSuccess invoked for userId=${event.userId} email=${event.email}`,
    );

    try {
      const at = new Date(event.at);

      // upsert: если пользователя (по email) ещё нет — создаём,
      // если есть — обновляем время последнего логина.
      await this.prisma.user.upsert({
        where: { email: event.email },
        create: {
          id: event.userId,
          email: event.email,
          lastLoginAt: at,
        },
        update: {
          lastLoginAt: at,
        },
      });

      const prettyAt = at.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      this.logger.log(`User saved to DB: ${event.email} at ${prettyAt}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `Failed to upsert user profile for ${event.email}: ${message}`,
      );
    }
  }
}
