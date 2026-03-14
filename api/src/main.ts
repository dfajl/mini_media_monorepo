import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Валидация по DTO; при ошибках — 422 Unprocessable Entity
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((e) =>
          e.constraints
            ? Object.values(e.constraints)
            : [`${e.property}: invalid`],
        );
        return new HttpException(
          { statusCode: HttpStatus.UNPROCESSABLE_ENTITY, message: messages },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mini Media API')
    .setDescription('API documentation for mini-media backend')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
