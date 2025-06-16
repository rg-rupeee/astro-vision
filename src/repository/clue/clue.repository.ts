import { Service } from 'typedi';
import { IBaseRepository } from '../base.repository';
import { IClue, ClueModel } from './clue.model';

@Service()
export class ClueRepository implements IBaseRepository<IClue> {
  async create(item: Omit<IClue, '_id'>): Promise<IClue> {
    return await ClueModel.create(item);
  }

  async update(
    id: string,
    item: Partial<Omit<IClue, '_id'>>,
  ): Promise<IClue | null> {
    return await ClueModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ClueModel.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: Partial<IClue>): Promise<IClue[]> {
    return await ClueModel.find(item).populate('city');
  }

  async findOne(item: Partial<IClue>): Promise<IClue | null> {
    return await ClueModel.findOne(item).populate('city');
  }

  async findById(id: string): Promise<IClue | null> {
    return await ClueModel.findById(id).populate('city');
  }
}
