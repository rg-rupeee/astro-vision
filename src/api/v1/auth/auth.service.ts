import { Inject, Service } from 'typedi';

import BasicAuth from '../../../use-case/auth/BasicAuth';
import { LoginDTO, SignupDTO } from './auth.schema';
import Zodiac from 'use-case/zodiac/Zodiac';

@Service()
export class AuthService {
  constructor(
    @Inject() private basicAuth: BasicAuth,
    @Inject() private zodiacUseCase: Zodiac,
  ) {}

  async signup({ email, name, password, birthdate }: SignupDTO) {
    const zodiacSign = this.zodiacUseCase.getZodiacSign(new Date(birthdate));

    // signup user
    const { user, token } = await this.basicAuth.signup({
      name,
      email,
      password,
      birthdate,
      zodiac: zodiacSign,
    });

    // TODO: send verification email and welcome email

    return {
      user,
      token,
    };
  }

  async passwordLogin({ email, password }: LoginDTO) {
    const { user, token } = await this.basicAuth.login({
      email,
      password,
    });

    return {
      user,
      token,
    };
  }
}
