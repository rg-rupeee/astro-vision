import { Router } from 'express';
import { Container } from 'typedi';

import AuthController from './auth.controller';
import {
  GuestRegisterSchema,
  LoginSchema,
  SignupSchema,
  UsernameCheckSchema,
} from './auth.schema';
import { zodValidator } from '@middleware/validator';

const router = Router();

const authController = Container.get(AuthController);

router.post(
  '/signup',
  zodValidator(SignupSchema, 'body'),
  authController.signup,
);

router.post(
  '/login',
  zodValidator(LoginSchema, 'body'),
  authController.passwordLogin,
);

router.post(
  '/guest/register',
  zodValidator(GuestRegisterSchema, 'body'),
  authController.guestRegister,
);

router.post(
  '/check-username',
  zodValidator(UsernameCheckSchema, 'body'),
  authController.checkUsernameAvailability,
);

export default router;
