import { Router } from 'express';
import { Container } from 'typedi';
import { zodValidator } from '@middleware/validator';
import CMSController from './cms.controller';
import {
  CreateCitySchema,
  UpdateCitySchema,
  CreateClueSchema,
  UpdateClueSchema,
  CityIdSchema,
  ClueIdSchema,
} from './cms.schema';

const router = Router();
const cmsController = Container.get(CMSController);

// TODO: add auth middleware
// TODO: add admin middleware for allowing this route only to admin

router.post(
  '/cities',
  zodValidator(CreateCitySchema, 'body'),
  cmsController.createCity,
);

router.put(
  '/cities/:id',
  zodValidator(CityIdSchema, 'params'),
  zodValidator(UpdateCitySchema, 'body'),
  cmsController.updateCity,
);

router.get('/cities', cmsController.listAllCities);

router.get(
  '/cities/:id',
  zodValidator(CityIdSchema, 'params'),
  cmsController.getCity,
);

// Clue routes
router.post(
  '/clues',
  zodValidator(CreateClueSchema, 'body'),
  cmsController.createClue,
);

router.put(
  '/clues/:id',
  zodValidator(ClueIdSchema, 'params'),
  zodValidator(UpdateClueSchema, 'body'),
  cmsController.updateClue,
);

router.get('/clues', cmsController.listAllClues);

router.get(
  '/clues/:id',
  zodValidator(ClueIdSchema, 'params'),
  cmsController.getClue,
);

// Get Random cities with clues
// router.get(
//   '/random-cities',
//   zodValidator(RandomCitiesSchema, 'query'),
//   cmsController.getRandomCitiesWithClues,
// );

export default router;
