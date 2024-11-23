import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggingService } from '../logging/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let msg: string | object = 'Internal server error';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.getResponse();
    }

    const logMsg =
      typeof msg === 'string' ? msg : JSON.stringify(msg);

    this.loggingService.error(
      `Error: ${logMsg}\nRequest: ${req.method} ${req.url}`,
    );

    res.status(status).json({
      statusCode: status,
      message: typeof msg === 'string' ? msg : msg['message'] || msg,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
