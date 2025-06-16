import { Schema, model, Types } from 'mongoose';

export enum GameStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface IGameResponse {
  questionId: Types.ObjectId;
  answer: string;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
}

export interface IGame {
  quizId: Types.ObjectId;
  primaryPlayerId: Types.ObjectId;
  invitedPlayers: Types.ObjectId[];
  joinedPlayers: Types.ObjectId[];
  status: GameStatus;
  responses: IGameResponse[];
  score: number;
  startedAt?: Date;
  completedAt?: Date;
}

const gameResponseSchema = new Schema<IGameResponse>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: 'Clue', required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    points: { type: Number, required: true },
    timeSpent: { type: Number, required: true },
  },
  { _id: false },
);

const gameSchema = new Schema<IGame>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    primaryPlayerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invitedPlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    joinedPlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: Object.values(GameStatus),
      default: GameStatus.Created,
      required: true,
    },
    responses: [gameResponseSchema],
    score: { type: Number, default: 0 },
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const GameModel = model<IGame>('Game', gameSchema);
