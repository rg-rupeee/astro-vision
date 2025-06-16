import { Service } from 'typedi';
import { MongoRepository } from '../mongo.repository';
import { IUser } from './user.interface';
import { UserModel } from './user.model';

@Service()
export class UserRepository extends MongoRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({ email });
  }

  async findByName(name: string): Promise<IUser | null> {
    return await this.findOne({ name });
  }

  async findByUserId(id: string): Promise<IUser> {
    return await this.model.findById(id).select('-password');
  }

  async create(userData: {
    name: string;
    email: string;
    birthdate: Date;
    zodiac: string;
  }): Promise<IUser> {
    return super.create(userData);
  }
}
