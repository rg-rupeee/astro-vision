import { Service } from 'typedi';
import { IBaseRepository } from '../base.repository';
import { IQuiz, QuizModel } from './quiz.model';

@Service()
export class QuizRepository implements IBaseRepository<IQuiz> {
  async create(item: IQuiz): Promise<IQuiz> {
    return await QuizModel.create(item);
  }

  async update(id: string, item: IQuiz): Promise<IQuiz | null> {
    return await QuizModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await QuizModel.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: Partial<IQuiz>): Promise<IQuiz[]> {
    return await QuizModel.find(item).populate('questions');
  }

  async findOne(item: Partial<IQuiz>): Promise<IQuiz | null> {
    return await QuizModel.findOne(item).populate('questions');
  }

  async findById(id: string): Promise<IQuiz | null> {
    return await QuizModel.findById(id).populate('questions');
  }
}
