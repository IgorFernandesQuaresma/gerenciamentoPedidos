import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Projeto de gerenciamento')
  .setDescription('Sistema de gerenciamento de pedidos')
  .setContact("Igor Fernandes","https://ifernandesdev.netlify.app","igor.devfernandes@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ ='03:00';
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
 }))
  app.enableCors()

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
