import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as authEvents from './events/auth.events';

@Injectable()
export class AuthEventsListener {
  private readonly logger = new Logger(AuthEventsListener.name);

  @OnEvent(authEvents.AUTH_LOGIN_SUCCESS_EVENT)
  handleLoginSuccess(event: authEvents.AuthLoginSuccessEvent) {
    this.logger.log(`User logged in: ${event.email} at ${event.at}`);
  }
}
