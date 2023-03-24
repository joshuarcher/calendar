import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // this will strip any extra content from the body of the request
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // this will transform the body of the request to match the DTO we expect
      // transform can impact performance but since this is an example figured it was worth noting
    }),
  );
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
