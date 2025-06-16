import { Service } from 'typedi';
import { MongoRepository } from '@repository/mongo.repository';
import { UserHoroscopeModel, IUserHoroscope } from './horoscope.model';
import { Types } from 'mongoose';

@Service()
export class UserHoroscopeRepository extends MongoRepository<IUserHoroscope> {
  constructor() {
    super(UserHoroscopeModel);
  }

  async findTodayHoroscope(userId: string): Promise<IUserHoroscope | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.findOne({
      userId: new Types.ObjectId(userId),
      generatedAt: {
        $gte: today,
        $lt: tomorrow,
      },
      isActive: true,
    });
  }

  async findUserHistory(
    userId: string,
    days: number = 7,
  ): Promise<IUserHoroscope[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - days);

    return UserHoroscopeModel.find({
      userId: new Types.ObjectId(userId),
      generatedAt: {
        $gte: pastDate,
        $lt: today,
      },
      isActive: true,
    }).sort({ generatedAt: -1 });
  }
}
