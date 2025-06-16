import { Service } from 'typedi';
import { MongoRepository } from '../mongo.repository';
import { IIdentity } from './identity.interface';
import { IdentityModel } from './identity.model';

@Service()
export class IdentityRepository extends MongoRepository<IIdentity> {
  constructor() {
    super(IdentityModel);
  }

  async findByUserId(userId: string): Promise<IIdentity | null> {
    return await this.model.findOne({ user: userId }).select('-password');
  }
}
