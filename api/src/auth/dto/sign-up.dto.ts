import { ApiProperty } from '@nestjs/swagger'; // Декоратор для описания полей DTO в Swagger (/docs).
import {
  IsDateString, // Валидатор: значение должно быть датой в формате ISO-8601 (строкой).
  IsEmail, // Валидатор: значение должно быть email (проверка формата).
  IsNotEmpty, // Валидатор: значение не должно быть пустым (пустая строка/undefined не пройдут).
  IsString, // Валидатор: значение должно быть строкой.
  MinLength, // Валидатор: минимальная длина строки.
} from 'class-validator';

// DTO-класс: описывает shape body для регистрации (sign up).
export class SignUpDto {
  @ApiProperty({ example: 'Иванов Иван Иванович' }) // Пример значения в Swagger UI.
  @IsNotEmpty({ message: 'Full name is required' }) // Ошибка, если поле отсутствует/пустое.
  @IsString() // Гарантирует, что fullName — строка.
  fullName!: string; // `!:`: обещаем TypeScript, что поле будет задано (заполнит runtime body + ValidationPipe).

  @ApiProperty({ example: '1999-12-31' }) // Пример даты рождения (как строка), удобный для HTML input[type=date].
  @IsNotEmpty({ message: 'Birth date is required' }) // Делает поле обязательным.
  @IsDateString({}, { message: 'Birth date must be a valid ISO date string' }) // Проверяет, что строка — валидная ISO дата/дата-время.
  birthDate!: string; // Храним как string в DTO, а в сервисе конвертим в Date (для Prisma DateTime).

  @ApiProperty({ example: 'demo@mini.media' }) // Пример email для Swagger.
  @IsNotEmpty({ message: 'Email is required' }) // Делает поле обязательным.
  @IsEmail({}, { message: 'Invalid email format' }) // Валидирует формат email (не проверяет существование домена).
  email!: string; // В сервисе обычно нормализуем: trim + lowerCase.

  @ApiProperty({ example: 'password123' }) // Пример пароля в Swagger (для реального проекта лучше не показывать реальные пароли).
  @IsNotEmpty({ message: 'Password is required' }) // Делает поле обязательным.
  @IsString() // Гарантирует, что password — строка.
  @MinLength(6, { message: 'Password must be at least 6 characters' }) // Минимальная длина пароля (базовая проверка).
  password!: string; // В сервисе пароль не храним как есть — хэшируем (bcrypt/argon2).
}
