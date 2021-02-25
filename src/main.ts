import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  app.setGlobalPrefix('api');
  (app as NestExpressApplication).use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(8000);
}
bootstrap();
