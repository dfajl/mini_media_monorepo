import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  AUTH_LOGIN_SUCCESS_EVENT,
  AuthLoginSuccessEvent,
} from './events/auth.events';
import { PrismaService } from '../prisma/prisma.service';

const DEMO_EMAIL = process.env.AUTH_DEMO_EMAIL ?? 'demo@mini.media';
const DEMO_PASSWORD = process.env.AUTH_DEMO_PASSWORD ?? 'password123';

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  surname: string | null;
};

export type SignUpResponse = {
  user: PublicUser;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
  ) {}

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

  async signUp(payload: SignUpDto): Promise<SignUpResponse> {
    const email = payload.email?.trim().toLowerCase();
    const password = payload.password;
    const fullName = payload.fullName?.trim();
    const birthDateIso = payload.birthDate;

    if (!email || !password || !fullName || !birthDateIso) {
      throw new BadRequestException(
        'fullName, birthDate, email and password are required',
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const birthDate = new Date(birthDateIso);

    // Upsert по email: если нет — создаём; если есть — обновляем профиль.
    // (Это и есть "как апсертить" пользователя в БД.)
    const user = await this.prisma.user.upsert({
      where: { email },
      create: {
        id: randomUUID(),
        email,
        name: fullName,
        birthDate,
        passwordHash,
        // lastLoginAt берётся по умолчанию (now()) из schema.prisma,
      },
      update: {
        name: fullName,
        birthDate,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
      },
    });

    return {
      user,
    };
  }
}
