import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';
  app.enableCors({ origin: allowedOrigin });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
