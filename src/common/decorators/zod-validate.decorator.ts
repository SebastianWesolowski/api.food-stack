import { UseFilters } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationFilter } from '../filters/zod-validation.filter';

export const ZodValidate = <TInput, TOutput>(
  paramSchema?: ZodSchema<TInput>,
  responseSchema?: ZodSchema<TOutput>,
) => {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown>;

    descriptor.value = async function (...args: unknown[]) {
      // Walidacja parametrów wejściowych
      if (paramSchema && args.length > 0) {
        console.log('🔍 [DEBUG] ZodValidate otrzymał args:', args[0]);

        let dataToValidate = args[0];

        // Obsługa Buffer
        if (Buffer.isBuffer(dataToValidate)) {
          console.log('🔍 [DEBUG] Wykryto Buffer, konwertuję na JSON');
          try {
            dataToValidate = JSON.parse(dataToValidate.toString());
            console.log('🔍 [DEBUG] Sparsowany Buffer:', dataToValidate);
          } catch (error) {
            console.error('❌ [ERROR] Błąd parsowania Buffer:', error);
          }
        }

        if (typeof dataToValidate === 'object' && dataToValidate !== null) {
          if ('body' in dataToValidate) {
            console.log(
              '🔍 [DEBUG] Wykryto dane z Netlify Functions, używam body:',
              (dataToValidate as any).body,
            );

            // Jeśli body jest stringiem, spróbuj sparsować jako JSON
            if (typeof (dataToValidate as any).body === 'string') {
              try {
                dataToValidate = JSON.parse((dataToValidate as any).body);
              } catch (error) {
                console.error('❌ [ERROR] Błąd parsowania body:', error);
                dataToValidate = (dataToValidate as any).body;
              }
            } else {
              dataToValidate = (dataToValidate as any).body;
            }
          }
        }

        console.log('🔍 [DEBUG] Dane przed walidacją:', dataToValidate);
        const paramResult = paramSchema.safeParse(dataToValidate);
        if (!paramResult.success) {
          console.error('❌ [ERROR] Błąd walidacji:', paramResult.error);
          throw Object.assign(paramResult.error, { _type: 'params' });
        }
        args[0] = paramResult.data;
        console.log('🔍 [DEBUG] Dane po walidacji:', args[0]);
      }

      // Wywołanie oryginalnej metody
      const result = await originalMethod.apply(this, args);

      // Walidacja odpowiedzi
      if (responseSchema) {
        const responseResult = responseSchema.safeParse(result);
        if (!responseResult.success) {
          throw Object.assign(responseResult.error, { _type: 'response' });
        }
        return responseResult.data;
      }

      return result;
    };

    UseFilters(ZodValidationFilter)(target, propertyKey, descriptor);
    return descriptor;
  };
};
