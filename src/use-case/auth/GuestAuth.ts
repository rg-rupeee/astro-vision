import { Service } from 'typedi';
import { IdentityRepository } from '../../repository/identity/identity.repository';
import { UserRepository } from '../../repository/user/user.repository';
import Auth from './Auth';
import { IUser } from '@repository/user/user.interface';
import AppError from '@util/error/AppError';
import ERRORS from '@constant/errorTypes';
import STATUS_CODES from '@constant/statusCodes';

@Service()
class GuestAuth extends Auth {
  constructor(
    protected readonly identityRepository: IdentityRepository,
    protected readonly userRepository: UserRepository,
  ) {
    super(identityRepository, userRepository);
  }

  async register(data: {
    name: string;
  }): Promise<{ user: IUser; token: string }> {
    return this.createGuestUser(data);
  }

  async checkUsernameAvailability(
    name: string,
  ): Promise<{ available: boolean }> {
    const existingUser = await this.userRepository.findByName(name);
    return { available: !existingUser };
  }

  // This method is required by the abstract class but not used for guest auth
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(_data: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: IUser; token: string }> {
    throw new AppError(ERRORS.INVALID_OPERATION, STATUS_CODES.BAD_REQUEST);
  }
}

export default GuestAuth;
