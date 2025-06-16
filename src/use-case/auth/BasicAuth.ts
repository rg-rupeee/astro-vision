import AppError from '@util/error/AppError';
import Auth from './Auth';
import ERRORS from '@constant/errorTypes';
import STATUS_CODES from '@constant/statusCodes';
import { Service } from 'typedi';
import { IdentityRepository } from '../../repository/identity/identity.repository';
import { UserRepository } from '../../repository/user/user.repository';

@Service()
class BasicAuth extends Auth {
  constructor(
    protected readonly identityRepository: IdentityRepository,
    protected readonly userRepository: UserRepository,
  ) {
    super(identityRepository, userRepository);
  }

  async signup(data: {
    email: string;
    password: string;
    name: string;
    birthdate: Date;
    zodiac: string;
  }) {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new AppError(ERRORS.USER_ALREADY_EXISTS, STATUS_CODES.BAD_REQUEST);
    }

    // Create user with identity
    const user = await this.createUser(data);

    // Generate initial token
    const { token } = await this.generateToken({
      userId: user._id.toString(),
      identifier: data.email,
    });

    return {
      user,
      token,
    };
  }

  async login(data: { email: string; password: string }) {
    return this.validateAndGenerateToken(data);
  }
}

export default BasicAuth;
