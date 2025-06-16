import { Router } from 'express';
import { HoroscopeController } from './horoscope.controller';
import { authenticate } from '../../../middleware/auth';
import { zodValidator } from '../../../middleware/validator';
import { historyQuerySchema } from './horoscope.schema';
import Container from 'typedi';

const router = Router();
const horoscopeController = Container.get(HoroscopeController);

router.get(
  '/history',
  authenticate,
  zodValidator(historyQuerySchema, 'query'),
  horoscopeController.getHistory,
);

router.get('/today', authenticate, horoscopeController.getToday);

export default router;
