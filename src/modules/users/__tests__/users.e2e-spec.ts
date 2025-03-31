import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '@/app.module';
import { createTestApp } from '@/common/test/create-test-app';
import {
  expectRequiredFieldError,
  expectZodError,
  ValidationErrorResponse,
} from '@/common/test/zod-error.utils';
import { mockUsers } from '../__mocks__/user.mocks';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    app = await createTestApp(AppModule);
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return all users', () => {
      return supertest(httpServer)
        .get('/users')
        .expect(200)
        .expect((res: { body: { users: any[] } }) => {
          expect(res.body.users).toEqual(mockUsers);
        });
    });
  });

  describe('POST /users/get-by-id', () => {
    it('should return user by id', () => {
      const testUserId = mockUsers[0].id;
      return supertest(httpServer)
        .post('/users/get-by-id')
        .send({ id: testUserId })
        .expect(201)
        .expect((res: { body: any }) => {
          expect(res.body).toEqual(mockUsers[0]);
        });
    });

    it('should return 400 for non-existent user', () => {
      return supertest(httpServer)
        .post('/users/get-by-id')
        .send({ id: 'non-existent-id' })
        .expect(400);
    });

    it('should return 400 for missing required fields', () => {
      return supertest(httpServer)
        .post('/users/get-by-id')
        .send({})
        .expect(400)
        .expect((res: { body: ValidationErrorResponse }) => {
          const errors = expectZodError(res);
          const error = expectRequiredFieldError(errors, 'id');
          expect(error?.validation.error).toBe('invalid_type');
        });
    });

    it('should return 400 for invalid id format', () => {
      return supertest(httpServer)
        .post('/users/get-by-id')
        .send({ id: 'invalid-uuid' })
        .expect(400)
        .expect((res: { body: ValidationErrorResponse }) => {
          const errors = expectZodError(res);
          const error = expectRequiredFieldError(errors, 'id');
          expect(error?.validation.error).toBe('invalid_string');
        });
    });
  });
});
