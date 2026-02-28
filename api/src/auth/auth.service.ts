import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

const DEMO_EMAIL = process.env.AUTH_DEMO_EMAIL ?? 'demo@mini.media';
const DEMO_PASSWORD = process.env.AUTH_DEMO_PASSWORD ?? 'password123';

@Injectable()
export class AuthService {
  login(payload: LoginDto) {
    const email = payload.email?.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
      tokenType: 'Bearer',
      user: {
        id: '1',
        email,
        name: 'Demo User',
      },
    };
  }
}
