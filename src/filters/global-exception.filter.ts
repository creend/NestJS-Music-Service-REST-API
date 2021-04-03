import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      const errorResponse: any = exception.getResponse();
      response.status(status).send({
        message: errorResponse.message,
        status,
      });
    } else {
      // console.log(exception);
      response
        .status(status)
        .send({ message: 'INTERNAL SERVER ERROR', status });
    }
  }
}
