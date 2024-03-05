import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
  console.log(`API Listening on port: ${APP_PORT}`);
}
bootstrap();
