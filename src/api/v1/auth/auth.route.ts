import { Router } from 'express';
import { Container } from 'typedi';

import AuthController from './auth.controller';
import { LoginSchema, SignupSchema } from './auth.schema';
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

export default router;
