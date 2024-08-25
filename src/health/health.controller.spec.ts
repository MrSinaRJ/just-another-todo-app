import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { HealthController } from './health.controller';

describe('Health controller complete check', () => {
  let controller: HealthController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return checked_at', () => {
    const result = controller.checkHealth();
    expect(result.checked_at).toBeDefined();
  });

  it('should return a 200 status code', async () => {
    return await supertest(app.getHttpServer())
      .get('/health')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('checked_at');
      });
  });
});
