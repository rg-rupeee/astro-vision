import { Router } from 'express';
import { HoroscopeController } from './horoscope.controller';
import { AuthRequest } from '../../../interface/auth';
import { authenticate } from '../../../middleware/auth';
import catchAsync from '../../../middleware/catchAsync';
import { zodValidator } from '../../../middleware/validator';
import { schemas } from './horoscope.schema';
import Container from 'typedi';

const router = Router();
const horoscopeController = Container.get(HoroscopeController);

router.get(
  '/history',
  authenticate,
  zodValidator(schemas['/history'].get.query, 'query'),
  catchAsync<AuthRequest>(
    horoscopeController.getHistory.bind(horoscopeController),
  ),
);

router.get(
  '/today',
  authenticate,
  zodValidator(schemas['/today'].get.query, 'query'),
  catchAsync<AuthRequest>(
    horoscopeController.getToday.bind(horoscopeController),
  ),
);

export default router;
