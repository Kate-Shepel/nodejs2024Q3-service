import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggingService } from '../logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const durationMs = Date.now() - startTime;

      this.loggingService.log(
        `${method} ${url} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(
          body,
        )} - Status: ${statusCode} - Duration: ${durationMs}ms`,
      );
    });

    next();
  }
}
