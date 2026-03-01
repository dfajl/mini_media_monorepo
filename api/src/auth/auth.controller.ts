import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }
}
