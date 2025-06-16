import request from 'supertest';
import App from '../../../src/app';
import { bootstrap, stop } from '../../test.core';

let app: App;

beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await stop(app);
});

describe('Auth API End-to-End Tests', () => {
  const signupData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  describe('POST /api/v1/auth/signup', () => {
    it('should signup a new user', async () => {
      const response = await request(app.app)
        .post('/api/v1/auth/signup')
        .send(signupData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty('_id');
      expect(response.body.data.user.email).toBe(signupData.email);
    });

    it('should not signup a user with an existing email', async () => {
      const response = await request(app.app)
        .post('/api/v1/auth/signup')
        .send(signupData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login an existing user', async () => {
      const response = await request(app.app)
        .post('/api/v1/auth/login')
        .send({
          email: signupData.email,
          password: signupData.password,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty('_id');
      expect(response.body.data.user.email).toBe(signupData.email);
      expect(response.body.data).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app.app)
        .post('/api/v1/auth/login')
        .send({
          email: signupData.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should not login with non-existing email', async () => {
      const response = await request(app.app)
        .post('/api/v1/auth/login')
        .send({
          email: 'non.existing@example.com',
          password: 'password123',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });
  });
});
