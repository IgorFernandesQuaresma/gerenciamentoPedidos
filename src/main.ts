import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ ='03:00';
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
 }))
  app.enableCors()

  await app.listen(4000);
}
bootstrap();
