// Декораторы для работы с телом запроса, объявления контроллера и метода POST
import { Body, Controller, Post } from '@nestjs/common';
// Декораторы для описания эндпоинта в Swagger (документация /docs)
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

// В Swagger все эндпоинты этого контроллера будут в группе "auth"
@ApiTags('auth')
// Все маршруты класса имеют префикс /auth (итого: /auth/login, /auth/...)
@Controller('auth')
export class AuthController {
  // Nest подставляет AuthService через DI; private readonly — только внутри класса, не переприсваивается
  constructor(private readonly authService: AuthService) {}

  // Swagger: краткое описание операции
  @ApiOperation({ summary: 'Login with email and password' })
  // Swagger: описание ответа 201 при успехе
  @ApiCreatedResponse({ description: 'Login successful' })
  // Swagger: описание ответа 401 при неверных данных
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  // Swagger: описание ответа 422 при ошибках валидации body
  @ApiResponse({
    status: 422,
    description: 'Validation failed (invalid email, short password, etc.)',
  })
  // Обработчик запроса POST /auth/login
  @Post('login')
  // payload — тело запроса (JSON), приведённое к типу LoginDto
  login(@Body() payload: LoginDto) {
    // @Body() payload = «в payload положи тело запроса целиком».
    return this.authService.login(payload);
  }
}
