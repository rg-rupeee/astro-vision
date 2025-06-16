// tests/unit/auth.controller.spec.ts

import AuthController from '../../src/api/v1/auth/auth.controller';
import { AuthService } from '../../src/api/v1/auth/auth.service';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/api/v1/auth/auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      signup: jest.fn(),
      passwordLogin: jest.fn(),
    } as any;
    controller = new AuthController(mockAuthService);
  });

  describe('signup', () => {
    it('should call authService.signup and return 201', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          email: 'test@example.com',
          name: 'Test',
          password: 'pass',
          birthdate: '2000-01-01',
        },
      });
      const res = httpMocks.createResponse();
      const result = {
        user: {
          _id: '1',
          email: 'test@example.com',
          name: 'Test User',
          birthdate: '2000-01-01',
          zodiac: 'Gemini',
        },
        token: 'mock-token',
      };
      mockAuthService.signup.mockResolvedValue(result as any);

      await controller.signup(req as any, res as any, jest.fn());

      expect(mockAuthService.signup).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test',
        password: 'pass',
        birthdate: '2000-01-01',
      });
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ success: true, data: result });
    });

    it('should handle service errors', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          email: 'fail@example.com',
          name: 'Fail',
          password: 'fail',
          birthdate: '2000-01-01',
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      mockAuthService.signup.mockRejectedValue(new Error('Signup error'));

      await controller.signup(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('passwordLogin', () => {
    it('should call authService.passwordLogin and return 200', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'test@example.com', password: 'pass' },
      });
      const res = httpMocks.createResponse();
      const result = {
        user: {
          _id: '1',
          email: 'test@example.com',
          name: 'Test User',
          birthdate: '2000-01-01',
          zodiac: 'Gemini',
        },
        token: 'jwt-token',
      };
      mockAuthService.passwordLogin.mockResolvedValue(result as any);

      await controller.passwordLogin(req as any, res as any, jest.fn());

      expect(mockAuthService.passwordLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'pass',
      });
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ success: true, data: result });
    });

    it('should handle service errors', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { email: 'fail@example.com', password: 'fail' },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      mockAuthService.passwordLogin.mockRejectedValue(new Error('Login error'));

      await controller.passwordLogin(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
