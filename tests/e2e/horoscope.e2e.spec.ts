// tests/e2e/horoscope.e2e.spec.ts

import request from 'supertest';
import app from '../testApp';

describe('Horoscope API E2E', () => {
  let token: string;

  beforeAll(async () => {
    // Signup and login to get JWT token
    await request(app).post('/api/v1/auth/signup').send({
      email: 'e2ehorouser@example.com',
      name: 'E2E Horouser',
      password: 'password123',
      birthdate: '2000-01-01',
    });

    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'e2ehorouser@example.com',
      password: 'password123',
    });

    token = res.body.data?.token;
  });

  describe('GET /api/v1/horoscope/today', () => {
    it("should return 200 and today's horoscope with valid token", async () => {
      const res = await request(app)
        .get('/api/v1/horoscope/today')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.prediction).toBeDefined();
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/v1/horoscope/today');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/horoscope/history', () => {
    it('should return 200 and history with valid token', async () => {
      const res = await request(app)
        .get('/api/v1/horoscope/history')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.horoscopes).toBeInstanceOf(Array);
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/v1/horoscope/history');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid query param', async () => {
      const res = await request(app)
        .get('/api/v1/horoscope/history?days=notanumber')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
