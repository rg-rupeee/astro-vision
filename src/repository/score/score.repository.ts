import { Service } from 'typedi';
import { IBaseRepository } from '../base.repository';
import { IScore, ScoreModel } from './score.model';

@Service()
export class ScoreRepository implements IBaseRepository<IScore> {
  async create(item: IScore): Promise<IScore> {
    return await ScoreModel.create(item);
  }

  async update(id: string, item: IScore): Promise<IScore | null> {
    return await ScoreModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ScoreModel.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: Partial<IScore>): Promise<IScore[]> {
    return await ScoreModel.find(item)
      .populate('gameId')
      .populate('quizId')
      .populate('playerId');
  }

  async findOne(item: Partial<IScore>): Promise<IScore | null> {
    return await ScoreModel.findOne(item)
      .populate('gameId')
      .populate('quizId')
      .populate('playerId');
  }

  async findById(id: string): Promise<IScore | null> {
    return await ScoreModel.findById(id)
      .populate('gameId')
      .populate('quizId')
      .populate('playerId');
  }

  // Additional methods specific to Score repository
  async findTopScores(limit: number = 10): Promise<IScore[]> {
    return await ScoreModel.find()
      .sort({ totalScore: -1, timeTaken: 1 })
      .limit(limit)
      .populate('gameId')
      .populate('quizId')
      .populate('playerId');
  }

  async findPlayerScores(playerId: string): Promise<IScore[]> {
    return await ScoreModel.find({ playerId })
      .sort({ createdAt: -1 })
      .populate('gameId')
      .populate('quizId')
      .populate('playerId');
  }
}
