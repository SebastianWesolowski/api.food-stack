import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '@/app.module';
import { createTestApp } from '@/common/test/create-test-app';
import {
  expectMinValueError,
  expectRequiredFieldError,
  expectZodError,
  ValidationErrorResponse,
} from '@/common/test/zod-error.utils';
import { mockDiets } from '@/modules/diets/__mocks__/diet.mocks';
import { mockUsers } from '@/modules/users/__mocks__/user.mocks';

describe('DietsController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    app = await createTestApp(AppModule);
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /diets/generate', () => {
    it('should generate diet for existing user', () => {
      const testUserId = mockUsers[0].id;
      return supertest(httpServer)
        .post('/diets/generate')
        .send({ userId: testUserId, numberOfDays: 1 })
        .expect(201)
        .expect((res: { body: any }) => {
          expect(res.body).toEqual(mockDiets);
        });
    });

    it('should return 400 for non-existent user', () => {
      return supertest(httpServer)
        .post('/diets/generate')
        .send({ userId: 'non-existent-id', numberOfDays: 1 })
        .expect(400);
    });

    it('should return 400 for missing required fields', () => {
      return supertest(httpServer)
        .post('/diets/generate')
        .send({ numberOfDays: 1 })
        .expect(400)
        .expect((res: { body: ValidationErrorResponse }) => {
          const errors = expectZodError(res);
          const error = expectRequiredFieldError(errors, 'userId');
          expect(error?.validation.error).toBe('invalid_type');
        });
    });

    it('should return 400 for invalid numberOfDays', () => {
      return supertest(httpServer)
        .post('/diets/generate')
        .send({ userId: mockUsers[0].id, numberOfDays: 0 })
        .expect(400)
        .expect((res: { body: ValidationErrorResponse }) => {
          const errors = expectZodError(res);
          const error = expectMinValueError(errors, 'numberOfDays');
          expect(error?.validation.error).toBe('too_small');
        });
    });
  });
});
