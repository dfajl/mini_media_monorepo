import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
  // Куда смотреть схему Prisma (относительно папки `api`).
  schema: 'prisma/schema.prisma',

  // Подключение к БД используется Prisma CLI для migrate/Introspection,
  // а также помогает PrismaClient узнать, куда ходить.
  datasource: {
    url: env('DATABASE_URL'),
  },
});

