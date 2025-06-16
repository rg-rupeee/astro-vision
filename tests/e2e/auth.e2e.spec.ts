// tests/e2e/auth.e2e.spec.ts

import request from 'supertest';
import app from '../testApp';

describe('Auth API E2E', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should return 201 for valid signup', async () => {
      const res = await request(app).post('/api/v1/auth/signup').send({
        email: 'e2euser@example.com',
        name: 'E2E User',
        password: 'password123',
        birthdate: '2000-01-01',
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should return 400 for invalid payload', async () => {
      const res = await request(app).post('/api/v1/auth/signup').send({
        email: 'not-an-email',
        password: 'short',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return 200 for valid login', async () => {
      // First, signup the user
      await request(app).post('/api/v1/auth/signup').send({
        email: 'e2elogin@example.com',
        name: 'E2E Login',
        password: 'password123',
        birthdate: '2000-01-01',
      });

      // Then, login
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'e2elogin@example.com',
        password: 'password123',
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'notfound@example.com',
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid payload', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'not-an-email',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
