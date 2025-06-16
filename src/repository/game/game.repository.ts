import { Service } from 'typedi';
import { IBaseRepository } from '../base.repository';
import { IGame, GameModel } from './game.model';

@Service()
export class GameRepository implements IBaseRepository<IGame> {
  async create(item: IGame): Promise<IGame> {
    return await GameModel.create(item);
  }

  async update(id: string, item: IGame): Promise<IGame | null> {
    return await GameModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await GameModel.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: Partial<IGame>): Promise<IGame[]> {
    return await GameModel.find(item)
      .populate('quizId')
      .populate('primaryPlayerId')
      .populate('invitedPlayers')
      .populate('joinedPlayers');
  }

  async findOne(item: Partial<IGame>): Promise<IGame | null> {
    return await GameModel.findOne(item)
      .populate('quizId')
      .populate('primaryPlayerId')
      .populate('invitedPlayers')
      .populate('joinedPlayers');
  }

  async findById(id: string): Promise<IGame | null> {
    return await GameModel.findById(id)
      .populate('quizId')
      .populate('primaryPlayerId')
      .populate('invitedPlayers')
      .populate('joinedPlayers');
  }
}
