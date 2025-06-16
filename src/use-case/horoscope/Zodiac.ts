import { ZODIAC_SIGNS, ZodiacSignValue } from '@constant/zodiacSigns';
import AppError from '@util/error/AppError';
import ERRORS from '@constant/errorTypes';
import STATUS_CODES from '@constant/statusCodes';
import { Service } from 'typedi';

@Service()
class Zodiac {
  getZodiacSign(birthdate: Date): ZodiacSignValue {
    const day = birthdate.getDate();
    const month = birthdate.getMonth() + 1;
    return this.calculateZodiacSign(day, month);
  }

  calculateZodiacSign(day: number, month: number): ZodiacSignValue {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return ZODIAC_SIGNS.ARIES;

    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return ZODIAC_SIGNS.TAURUS;

    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return ZODIAC_SIGNS.GEMINI;

    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return ZODIAC_SIGNS.CANCER;

    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return ZODIAC_SIGNS.LEO;

    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return ZODIAC_SIGNS.VIRGO;

    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return ZODIAC_SIGNS.LIBRA;

    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return ZODIAC_SIGNS.SCORPIO;

    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return ZODIAC_SIGNS.SAGITTARIUS;

    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return ZODIAC_SIGNS.CAPRICORN;

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return ZODIAC_SIGNS.AQUARIUS;

    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return ZODIAC_SIGNS.PISCES;

    throw new AppError(
      ERRORS.INVALID_REQUEST,
      STATUS_CODES.BAD_REQUEST,
      'Invalid date for zodiac sign calculation',
    );
  }
}

export default Zodiac;
