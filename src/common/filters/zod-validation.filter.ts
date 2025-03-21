import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(Error)
export class ZodValidationFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Sprawdź czy błąd dotyczy walidacji Zod
    if (
      exception.message.includes('Nieprawidłowa struktura') &&
      exception['cause'] instanceof ZodError
    ) {
      const zodError = exception['cause'];

      // Szczegółowe logowanie w trybie dev
      if (process.env.NODE_ENV === 'development') {
        console.error('Błąd walidacji Zod:');
        console.error(JSON.stringify(zodError.format(), null, 2));
      }

      // Odpowiedź dla klienta
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          process.env.NODE_ENV === 'development'
            ? 'Szczegółowe błędy walidacji danych'
            : 'Nieprawidłowe dane wejściowe',
        errors:
          process.env.NODE_ENV === 'development'
            ? zodError.issues.map((issue) => ({
                field: issue.path.join('.'),
                code: issue.code,
                message: issue.message,
              }))
            : zodError.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: 'Nieprawidłowa wartość',
              })),
      });
    }

    // Dla innych błędów
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        process.env.NODE_ENV === 'development'
          ? exception.message
          : 'Internal Server Error',
    });
  }
}
