import { Inject, Service } from 'typedi';

import BasicAuth from '../../../use-case/auth/BasicAuth';
import GuestAuth from '../../../use-case/auth/GuestAuth';
import {
  GuestRegisterDTO,
  LoginDTO,
  SignupDTO,
  UsernameCheckDTO,
} from './auth.schema';

@Service()
export class AuthService {
  constructor(
    @Inject() private basicAuth: BasicAuth,
    @Inject() private guestAuth: GuestAuth,
  ) {}

  async signup({ email, name, password }: SignupDTO) {
    // signup user
    const { user, token } = await this.basicAuth.signup({
      name,
      email,
      password,
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

  async guestRegister({ name }: GuestRegisterDTO) {
    const { user, token } = await this.guestAuth.register({ name });

    return {
      user,
      token,
    };
  }

  async checkUsernameAvailability({ name }: UsernameCheckDTO) {
    return await this.guestAuth.checkUsernameAvailability(name);
  }
}
