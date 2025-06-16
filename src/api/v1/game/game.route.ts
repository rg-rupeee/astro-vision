import { Router } from 'express';
import { GameController } from './game.controller';
import { authenticate } from '@middleware/auth';
import Container from 'typedi';

const router = Router();
const gameController = Container.get(GameController);

// Get user's game history
router.get('/history', authenticate, gameController.getHistory);

// Get specific game details
router.get('/history/:game_id', authenticate, gameController.getGameDetails);

// Create a new game
router.post('/new', authenticate, gameController.createNewGame);

// Start a game
router.post('/:game_id/start', authenticate, gameController.startGame);

// Continue game at a specific level
router.get(
  '/:game_id/continue/:question_level',
  authenticate,
  gameController.continueGame,
);

// Submit answer for a level
router.post(
  '/:game_id/submit/:question_level',
  authenticate,
  gameController.submitAnswer,
);

// Complete the game
router.post('/:game_id/complete', authenticate, gameController.completeGame);

export default router;
