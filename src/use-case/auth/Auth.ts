import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { Service } from 'typedi';
import { IdentityRepository } from '../../repository/identity/identity.repository';
import { UserRepository } from '../../repository/user/user.repository';
import { IUser } from '@repository/user/user.interface';
import STATUS_CODES from '@constant/statusCodes';
import ERRORS from '@constant/errorTypes';
import AppError from '@util/error/AppError';
import BASE_CONFIG from '@config/environment';

@Service()
abstract class Auth {
  private readonly JWT_SECRET = BASE_CONFIG.JWT_SECRET;
  private readonly SALT_ROUNDS = BASE_CONFIG.SALT_ROUNDS;

  constructor(
    protected readonly identityRepository: IdentityRepository,
    protected readonly userRepository: UserRepository,
  ) {}

  protected async createUser({
    name,
    email,
    password,
    birthdate,
    zodiac,
  }: {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    zodiac: string;
  }): Promise<IUser> {
    // Create user
    const user = await this.userRepository.create({
      name,
      email,
      birthdate,
      zodiac,
    });

    // Create identity
    const identityData: any = {
      user: new Types.ObjectId(user._id.toString()),
    };

    if (password) {
      identityData.password = await this.hashPassword(password);
    }

    await this.identityRepository.create(identityData);

    return user;
  }

  protected async isCredentialsValid({
    userId,
    password,
  }: {
    userId: string;
    password: string;
  }): Promise<boolean> {
    const identity = await this.identityRepository.findOne({
      user: new Types.ObjectId(userId.toString()),
    });

    if (!identity || !identity.password) {
      return false;
    }

    return bcrypt.compare(password, identity.password);
  }

  protected async validateAndGenerateToken({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    // Find user by email
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new AppError(ERRORS.USER_NOT_FOUND, STATUS_CODES.BAD_REQUEST);
    }

    // Validate password
    const isValid = await this.isCredentialsValid({
      userId: user._id.toString(),
      password,
    });

    if (!isValid) {
      throw new AppError(ERRORS.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
    }

    // Generate new token
    const { token } = await this.generateToken({
      userId: user._id.toString(),
      identifier: email,
    });

    return { user, token };
  }

  protected async generateToken({
    userId,
    identifier,
  }: {
    userId: string;
    identifier: string;
  }) {
    const tokenId = Date.now().toString();
    const token = await this.createJWT({
      userId,
      identifier,
      tokenId,
    });

    // Store token - keep only 3 tokens allowing max 3 devices
    await this.identityRepository.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          assignedTokens: {
            $each: [tokenId],
            $slice: -3,
          },
        },
      },
    );

    return { tokenId, token };
  }

  private async createJWT({
    userId,
    identifier,
    tokenId,
  }: {
    userId: string;
    identifier: string;
    tokenId: string;
  }): Promise<string> {
    return jwt.sign(
      {
        userId,
        identifier,
        tokenId,
      },
      this.JWT_SECRET,
      {
        expiresIn: '24h',
      },
    );
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  protected async isTokenValid(userId: string, token: string) {
    const identity = await this.identityRepository.findOne({
      user: new Types.ObjectId(userId.toString()),
    });

    if (identity?.assignedTokens.includes(token)) {
      return this.validateToken(token);
    }

    return false;
  }

  private async validateToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new AppError(ERRORS.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
    }
  }

  protected async revokeToken(userId: string, token: string) {
    return this.identityRepository.findOneAndUpdate(
      { user: new Types.ObjectId(userId.toString()) },
      { $pull: { assignedTokens: token } },
    );
  }

  protected async revokeAllTokens(userId: string) {
    return this.identityRepository.findOneAndUpdate(
      { user: new Types.ObjectId(userId.toString()) },
      { $set: { assignedTokens: [] } },
    );
  }

  abstract login(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: IUser; token: string }>;
}

export default Auth;
