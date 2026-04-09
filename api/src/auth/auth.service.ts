import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginDto } from './dto/login.dto';
import {
  AUTH_LOGIN_SUCCESS_EVENT,
  AuthLoginSuccessEvent,
} from './events/auth.events';

const DEMO_EMAIL = process.env.AUTH_DEMO_EMAIL ?? 'demo@mini.media';
const DEMO_PASSWORD = process.env.AUTH_DEMO_PASSWORD ?? 'password123';

@Injectable()
export class AuthService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  login(payload: LoginDto) {
    const email = payload.email?.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user = {
      id: '1',
      email,
      name: 'Demo User',
      surname: 'FAYL',
    };

    const loginEvent: AuthLoginSuccessEvent = {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      at: new Date().toISOString(),
    };

    this.eventEmitter.emit(AUTH_LOGIN_SUCCESS_EVENT, loginEvent);

    return {
      accessToken: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
      tokenType: 'Bearer',
      user,
    };
  }
}
