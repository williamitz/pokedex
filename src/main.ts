import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.setGlobalPrefix('api/v2'); // agregar prefijo al backend

  await app.listen(AppModule.port, () => {
    console.log('App corriendo en ', AppModule.port);
  });
}
bootstrap();
