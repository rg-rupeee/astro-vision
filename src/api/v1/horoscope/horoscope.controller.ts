import { Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class HoroscopeController {
  async getHistory(req: Request, res: Response) {
    res.json({
      history: [
        {
          date: '2025-06-15',
          sign: 'Aries',
          prediction: 'Good day for new beginnings.',
        },
        {
          date: '2025-06-14',
          sign: 'Aries',
          prediction: 'Focus on your health.',
        },
      ],
    });
  }

  async getToday(req: Request, res: Response) {
    res.json({
      today: {
        date: '2025-06-16',
        sign: 'Aries',
        prediction: 'Opportunities are coming your way.',
      },
    });
  }
}
