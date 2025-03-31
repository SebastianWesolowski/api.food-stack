import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

export async function createTestApp(module: any): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule({
    imports: [module],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}
