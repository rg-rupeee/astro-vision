import { Service } from 'typedi';
import { IBaseRepository } from '../base.repository';
import { ICity, CityModel } from './city.model';

@Service()
export class CityRepository implements IBaseRepository<ICity> {
  async create(item: Omit<ICity, '_id'>): Promise<ICity> {
    return await CityModel.create(item);
  }

  async update(
    id: string,
    item: Partial<Omit<ICity, '_id'>>,
  ): Promise<ICity | null> {
    return await CityModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await CityModel.findByIdAndDelete(id);
    return result !== null;
  }

  async find(item: Partial<ICity>): Promise<ICity[]> {
    return await CityModel.find(item);
  }

  async findOne(item: Partial<ICity>): Promise<ICity | null> {
    return await CityModel.findOne(item);
  }

  async findById(id: string): Promise<ICity | null> {
    return await CityModel.findById(id);
  }
}
