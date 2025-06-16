import { GameModel, GameStatus } from '@repository/game/game.model';
import { QuizModel, QuizType } from '@repository/quiz/quiz.model';
import { IQuiz } from '@repository/quiz/quiz.model';
import { Service } from 'typedi';
import AppError from '@util/error/AppError';
import STATUS_CODES from '@constant/statusCodes';
import ERRORS from '@constant/errorTypes';

@Service()
export class GameService {
  async getHistory({ userId }: { userId: string }) {
    const games = await GameModel.find({ primaryPlayerId: userId })
      .populate('quizId')
      .sort({ createdAt: -1 });
    return games;
  }

  async getGameDetails({ gameId }: { gameId: string }) {
    try {
      const game = await GameModel.findById(gameId)
        .populate('quizId')
        .populate('primaryPlayerId', 'name email')
        .populate('joinedPlayers', 'name email');

      if (!game) {
        throw new AppError(ERRORS.GAME_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      return game;
    } catch (error: any) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new AppError(
          ERRORS.INVALID_REQUEST,
          STATUS_CODES.BAD_REQUEST,
          'Invalid game ID format',
        );
      }
      throw error;
    }
  }

  async createNewGame(params: {
    userId: string;
    totalQuestions: number;
    quizType?: QuizType;
    timePerQuestion?: number;
  }) {
    const { userId, totalQuestions, quizType, timePerQuestion } = params;

    const quiz = await QuizModel.create({
      quizType: quizType || QuizType.Simple,
      config: {
        totalQuestions,
        timeLimit: timePerQuestion || 0,
        difficulty: 5,
      },
      questions: [],
    });

    const game = await GameModel.create({
      quizId: quiz._id,
      primaryPlayerId: userId,
      invitedPlayers: [],
      joinedPlayers: [userId],
      status: GameStatus.Created,
    });

    return game;
  }

  async startGame({ gameId }: { gameId: string }) {
    try {
      const game = await GameModel.findById(gameId).populate<{
        quizId: IQuiz;
      }>('quizId');

      if (!game) {
        throw new AppError(ERRORS.GAME_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      game.status = GameStatus.InProgress;
      game.startedAt = new Date();
      await game.save();

      return game;
    } catch (error: any) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new AppError(
          ERRORS.INVALID_REQUEST,
          STATUS_CODES.BAD_REQUEST,
          'Invalid game ID format',
        );
      }
      throw error;
    }
  }

  async continueGame(params: { gameId: string; questionLevel: number }) {
    try {
      const { gameId, questionLevel } = params;

      const game = await GameModel.findById(gameId).populate<{
        quizId: IQuiz;
      }>('quizId');

      if (!game) {
        throw new AppError(ERRORS.GAME_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      const quiz = game.quizId;
      const hasNext = questionLevel < quiz.config.totalQuestions;

      return {
        currentQuestion: {}, // Get actual question data
        hasNext,
        level: questionLevel,
      };
    } catch (error: any) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new AppError(
          ERRORS.INVALID_REQUEST,
          STATUS_CODES.BAD_REQUEST,
          'Invalid game ID format',
        );
      }
      throw error;
    }
  }

  async submitAnswer(params: {
    gameId: string;
    questionLevel: number;
    answer: string;
  }) {
    try {
      const { gameId, questionLevel, answer } = params;
      const game = await GameModel.findById(gameId);

      if (!game) {
        throw new AppError(ERRORS.GAME_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      const isCorrect = true; // Replace with actual validation
      const points = 10; // Replace with actual points calculation
      const timeSpent = 0; // Replace with actual time calculation

      game.responses.push({
        questionId: game.quizId,
        answer,
        isCorrect,
        points,
        timeSpent,
      });

      await game.save();

      return {
        isCorrect,
        points,
        level: questionLevel,
      };
    } catch (error: any) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new AppError(
          ERRORS.INVALID_REQUEST,
          STATUS_CODES.BAD_REQUEST,
          'Invalid game ID format',
        );
      }
      throw error;
    }
  }

  async completeGame({ gameId }: { gameId: string }) {
    try {
      const game = await GameModel.findById(gameId);

      if (!game) {
        throw new AppError(ERRORS.GAME_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      const finalScore = game.responses.reduce(
        (total, response) => total + response.points,
        0,
      );

      game.status = GameStatus.Completed;
      game.completedAt = new Date();
      game.score = finalScore;
      await game.save();

      return {
        finalScore,
        ranking: 1, // Replace with actual ranking calculation
      };
    } catch (error: any) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new AppError(
          ERRORS.INVALID_REQUEST,
          STATUS_CODES.BAD_REQUEST,
          'Invalid game ID format',
        );
      }
      throw error;
    }
  }
}
