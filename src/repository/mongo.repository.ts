import { Model, Document, FilterQuery } from 'mongoose';
import { IBaseRepository } from './base.repository';

export abstract class MongoRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    const result = await this.model.create(item);
    return result;
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const result = await this.model.findByIdAndUpdate(id, item, { new: true });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: FilterQuery<T>): Promise<T[]> {
    const result = await this.model.find(item);
    return result;
  }

  async findOne(item: FilterQuery<T>): Promise<T | null> {
    const result = await this.model.findOne(item);
    return result;
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.model.findById(id);
    return result;
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    update: FilterQuery<T>,
    options: any = { new: true },
  ): Promise<T | null> {
    const result = await this.model
      .findOneAndUpdate(filter, update, options)
      .lean();
    return result as T | null;
  }
}
