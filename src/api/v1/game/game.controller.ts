import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '@interface/auth';
import { GameService } from './game.service';
import { Inject, Service } from 'typedi';
import catchAsync from '@middleware/catchAsync';

@Service()
export class GameController {
  constructor(@Inject() private gameService: GameService) {}

  public getHistory = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const userId = (req as AuthRequest).user._id;
      const result = await this.gameService.getHistory({ userId });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );

  public getGameDetails = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const gameId = req.params.game_id;
      const result = await this.gameService.getGameDetails({ gameId });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );

  public createNewGame = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const userId = (req as AuthRequest).user._id;
      const { totalQuestions, quizType, timePerQuestion } = req.body;
      const result = await this.gameService.createNewGame({
        userId,
        totalQuestions,
        quizType,
        timePerQuestion,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    },
  );

  public startGame = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const gameId = req.params.game_id;
      const result = await this.gameService.startGame({ gameId });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );

  public continueGame = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const gameId = req.params.game_id;
      const questionLevel = parseInt(req.params.question_level);
      const result = await this.gameService.continueGame({
        gameId,
        questionLevel,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );

  public submitAnswer = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const gameId = req.params.game_id;
      const questionLevel = parseInt(req.params.question_level);
      const { answer } = req.body;
      const result = await this.gameService.submitAnswer({
        gameId,
        questionLevel,
        answer,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );

  public completeGame = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const gameId = req.params.game_id;
      const result = await this.gameService.completeGame({ gameId });
      res.status(200).json({
        success: true,
        data: result,
      });
    },
  );
}
