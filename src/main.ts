import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const loggingService = app.get(LoggingService);

  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  process.on('uncaughtException', (err) => {
    loggingService.error('Uncaught Exception', err.stack);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', String(reason));
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  loggingService.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
