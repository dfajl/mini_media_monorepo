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

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  surname: string | null;
  birthDate: Date | null;
  createdAt: Date;
  lastLoginAt: Date;
};

export type SignUpResponse = {
  user: PublicUser;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: 'Bearer';
  user: PublicUser;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
  ) {}

  async login(payload: LoginDto): Promise<LoginResponse> {
    const email = payload.email?.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const userWithSecrets = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        birthDate: true,
        createdAt: true,
        passwordHash: true,
      },
    });

    if (!userWithSecrets?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const ok = await bcrypt.compare(password, userWithSecrets.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const lastLoginAt = new Date();

    const user: PublicUser = {
      id: userWithSecrets.id,
      email: userWithSecrets.email,
      name: userWithSecrets.name,
      surname: userWithSecrets.surname,
      birthDate: userWithSecrets.birthDate,
      createdAt: userWithSecrets.createdAt,
      lastLoginAt,
    };

    const loginEvent: AuthLoginSuccessEvent = {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      at: lastLoginAt.toISOString(),
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
        birthDate: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    return {
      user,
    };
  }
}
