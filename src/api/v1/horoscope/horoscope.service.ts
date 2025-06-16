import { Service } from 'typedi';
import { GenerateHoroscopeUseCase } from '../../../use-case/horoscope/GenerateHoroscope';
import { UserHoroscopeRepository } from '../../../repository/horoscope/horoscope.repository';
import AppError from '../../../util/error/AppError';
import { IUserHoroscope } from '../../../repository/horoscope/horoscope.model';
import logger from '../../../util/logger';
import { Types } from 'mongoose';
import ERRORS from '../../../constant/errorTypes';
import STATUS_CODES from '../../../constant/statusCodes';
import { UserRepository } from '@repository/user/user.repository';

@Service()
export class HoroscopeService {
  constructor(
    private userRepository: UserRepository,
    private userHoroscopeRepository: UserHoroscopeRepository,
    private generateHoroscopeUseCase: GenerateHoroscopeUseCase,
  ) {}

  async getTodayHoroscope(userId: string): Promise<IUserHoroscope> {
    try {
      logger.info(`Fetching today's horoscope for user ${userId}`);

      // Fetch user details
      const user = await this.userRepository.findById(userId);

      if (!user) {
        logger.error(`User not found: ${userId}`);
        throw new AppError(ERRORS.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      // Check if horoscope already exists for today
      let horoscope =
        await this.userHoroscopeRepository.findTodayHoroscope(userId);

      if (!horoscope) {
        logger.info(`Generating new horoscope for user ${userId}`);

        const prediction = this.generateHoroscopeUseCase.execute();

        const horoscopeData = {
          userId: new Types.ObjectId(userId),
          zodiacSign: user.zodiac,
          prediction,
          generatedAt: new Date(),
          isActive: true,
        };

        horoscope = await this.userHoroscopeRepository.create(horoscopeData);

        logger.info(`Generated new horoscope for user ${userId}`);
      }

      return horoscope;
    } catch (error) {
      logger.error('Error in getTodayHoroscope:', error);
      throw new AppError(
        ERRORS.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHoroscopeHistory(
    userId: string,
    days: number = 7,
  ): Promise<IUserHoroscope[]> {
    try {
      logger.info(
        `Fetching horoscope history for user ${userId} for last ${days} days`,
      );

      const history = await this.userHoroscopeRepository.findUserHistory(
        userId,
        days,
      );

      if (!history.length) {
        logger.info(`No horoscope history found for user ${userId}`);
      }

      return history;
    } catch (error) {
      logger.error('Error in getHoroscopeHistory:', error);
      throw new AppError(
        ERRORS.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
