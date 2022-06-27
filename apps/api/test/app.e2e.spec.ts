import * as supertest from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // add mock data to prisma
  });
  it('/sr/{code} e2e', () => {
    return supertest(app.getHttpServer())
    .get('/sr/vlr')
    .expect(200)
  });
  it('/{hashid} e2e', () => {
    return supertest(app.getHttpServer())
    .get('/198')
    .expect(200)
  });
});