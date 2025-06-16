import { Schema, model, Types } from 'mongoose';

export interface IScore {
  _id: Types.ObjectId;
  gameId: Types.ObjectId;
  quizId: Types.ObjectId;
  playerId: Types.ObjectId;
  totalScore: number;
  timeTaken: number;
}

const scoreSchema = new Schema<IScore>(
  {
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    playerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalScore: { type: Number, required: true, default: 0 },
    timeTaken: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

// Create compound index for unique score per player per game
scoreSchema.index({ gameId: 1, playerId: 1 }, { unique: true });

export const ScoreModel = model<IScore>('Score', scoreSchema);
