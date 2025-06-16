import { Inject, Service } from 'typedi';

import BasicAuth from '../../../use-case/auth/BasicAuth';
import { LoginDTO, SignupDTO } from './auth.schema';

@Service()
export class AuthService {
  constructor(@Inject() private basicAuth: BasicAuth) {}

  async signup({ email, name, password, birthdate }: SignupDTO) {
    // signup user
    const { user, token } = await this.basicAuth.signup({
      name,
      email,
      password,
      birthdate,
      zodiac: 'asdf',
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
