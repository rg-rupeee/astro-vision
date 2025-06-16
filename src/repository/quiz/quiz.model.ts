import { Schema, model, Types } from 'mongoose';

export enum QuizType {
  Simple = 'Simple',
  FastestFinger = 'Fastest Finger',
  TimeTrial = 'Time Trial',
}

export interface IQuizConfig {
  totalQuestions: number;
  timeLimit: number;
  difficulty: number;
}

export interface IQuiz {
  _id: Types.ObjectId;
  quizType: QuizType;
  questions: Types.ObjectId[];
  config: IQuizConfig;
}

const quizConfigSchema = new Schema<IQuizConfig>(
  {
    totalQuestions: { type: Number, required: true, min: 1 },
    timeLimit: { type: Number, required: true, min: 0 },
    difficulty: { type: Number, required: true, min: 1, max: 10 },
  },
  { _id: false },
);

const quizSchema = new Schema<IQuiz>(
  {
    quizType: {
      type: String,
      enum: Object.values(QuizType),
      required: true,
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Clue' }],
    config: { type: quizConfigSchema, required: true },
  },
  {
    timestamps: true,
  },
);

export const QuizModel = model<IQuiz>('Quiz', quizSchema);
