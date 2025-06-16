import { Response } from 'express';
import { Service } from 'typedi';
import { HoroscopeService } from './horoscope.service';
import AppError from '../../../util/error/AppError';
import ERRORS from '../../../constant/errorTypes';
import STATUS_CODES from '../../../constant/statusCodes';
import { AuthRequest } from '@interface/auth';

@Service()
export class HoroscopeController {
  constructor(private horoscopeService: HoroscopeService) {}

  async getToday(req: AuthRequest, res: Response) {
    const user = req.user;

    const horoscope = await this.horoscopeService.getTodayHoroscope(
      user._id.toString(),
    );

    res.json({
      success: true,
      data: {
        date: horoscope.generatedAt,
        sign: horoscope.zodiacSign,
        prediction: horoscope.prediction,
      },
    });
  }

  async getHistory(req: AuthRequest, res: Response) {
    const user = req.user;
    const { days = 7 } = req.query as { days?: string };

    const history = await this.horoscopeService.getHoroscopeHistory(
      user._id.toString(),
      Number(days),
    );

    res.json({
      success: true,
      data: {
        horoscopes: history.map(h => ({
          date: h.generatedAt,
          sign: h.zodiacSign,
          prediction: h.prediction,
        })),
      },
    });
  }
}
