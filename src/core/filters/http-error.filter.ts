import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';

import { isFunction } from 'lodash';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    const errorResponse = {
      statusCode: isFunction(exception.getStatus)
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        exception.message
          ? exception.message
          : exception.message,
      method: request.method,
      path: request.path,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'Exception',
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
