import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthEventsListener } from './auth-events.listener';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthEventsListener],
})
export class AuthModule {}
