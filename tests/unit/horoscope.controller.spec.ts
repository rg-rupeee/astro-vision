// tests/unit/horoscope.controller.spec.ts

import { HoroscopeController } from '../../src/api/v1/horoscope/horoscope.controller';
import { HoroscopeService } from '../../src/api/v1/horoscope/horoscope.service';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/api/v1/horoscope/horoscope.service');

describe('HoroscopeController', () => {
  let controller: HoroscopeController;
  let mockHoroscopeService: jest.Mocked<HoroscopeService>;

  beforeEach(() => {
    mockHoroscopeService = {
      getTodayHoroscope: jest.fn(),
      getHoroscopeHistory: jest.fn(),
    } as any;
    controller = new HoroscopeController(mockHoroscopeService);
  });

  describe('getToday', () => {
    it('should call horoscopeService.getTodayHoroscope and return correct JSON', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        user: { _id: 'user123' },
      });
      const res = httpMocks.createResponse();
      const result = {
        generatedAt: '2025-06-16',
        zodiacSign: 'Gemini',
        prediction: 'You will have a great day!',
        userId: 'user123',
        isActive: true,
        createdAt: '2025-06-16T00:00:00.000Z',
        updatedAt: '2025-06-16T00:00:00.000Z',
        _id: 'mockid1',
      };
      mockHoroscopeService.getTodayHoroscope.mockResolvedValue(result as any);

      await controller.getToday(req as any, res as any, jest.fn());

      expect(mockHoroscopeService.getTodayHoroscope).toHaveBeenCalledWith(
        'user123',
      );
      expect(res._getJSONData()).toEqual({
        success: true,
        data: {
          date: result.generatedAt,
          sign: result.zodiacSign,
          prediction: result.prediction,
        },
      });
    });

    it('should handle service errors', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        user: { _id: 'user123' },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      const error = new Error('Service error');
      mockHoroscopeService.getTodayHoroscope.mockRejectedValue(error);

      await controller.getToday(req as any, res as any, next);

      // Wait for the promise to resolve and then check next
      setImmediate(() => {
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('getHistory', () => {
    it('should call horoscopeService.getHoroscopeHistory and return correct JSON', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        user: { _id: 'user123' },
        query: { days: '5' },
      });
      const res = httpMocks.createResponse();
      const history = [
        {
          generatedAt: '2025-06-16',
          zodiacSign: 'Gemini',
          prediction: 'Good day.',
          userId: 'user123',
          isActive: true,
          createdAt: '2025-06-16T00:00:00.000Z',
          updatedAt: '2025-06-16T00:00:00.000Z',
          _id: 'mockid2',
        },
        {
          generatedAt: '2025-06-15',
          zodiacSign: 'Gemini',
          prediction: 'Average day.',
          userId: 'user123',
          isActive: true,
          createdAt: '2025-06-15T00:00:00.000Z',
          updatedAt: '2025-06-15T00:00:00.000Z',
          _id: 'mockid3',
        },
      ];
      mockHoroscopeService.getHoroscopeHistory.mockResolvedValue(
        history as any,
      );

      await controller.getHistory(req as any, res as any, jest.fn());

      expect(mockHoroscopeService.getHoroscopeHistory).toHaveBeenCalledWith(
        'user123',
        5,
      );
      expect(res._getJSONData()).toEqual({
        success: true,
        data: {
          horoscopes: history.map(h => ({
            date: h.generatedAt,
            sign: h.zodiacSign,
            prediction: h.prediction,
          })),
        },
      });
    });

    it('should handle service errors', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        user: { _id: 'user123' },
        query: { days: '5' },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      const error = new Error('Service error');
      mockHoroscopeService.getHoroscopeHistory.mockRejectedValue(error);

      await controller.getHistory(req as any, res as any, next);

      setImmediate(() => {
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
