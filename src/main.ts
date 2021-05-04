import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  const configService: ConfigService = app.get('ConfigService');
  app.useStaticAssets(configService.get('app.staticFilesPath'));
  app.use(helmet(configService.get('helmet')));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe(configService.get('app.validationPipe')),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(8000);
}
bootstrap();
