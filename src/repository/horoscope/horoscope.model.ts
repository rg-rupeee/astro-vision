import { Schema, model, Types, Document } from 'mongoose';
import { HoroscopePrediction } from '@interface/horoscopePrediction';

export interface IUserHoroscope extends Document {
  userId: Types.ObjectId;
  zodiacSign: string;
  prediction: HoroscopePrediction;
  generatedAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userHoroscopeSchema = new Schema<IUserHoroscope>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    zodiacSign: {
      type: String,
      required: true,
      index: true,
    },
    prediction: {
      type: {
        message: String,
        additionalInfo: {
          luckyNumber: Number,
          luckyColor: String,
          mood: String,
          compatibility: String,
          advice: String,
          element: String,
          planetaryInfluence: String,
          energy: {
            type: String,
            enum: ['high', 'medium', 'low'],
          },
          focus: String,
        },
      },
      required: true,
    },
    generatedAt: {
      type: Date,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying of user's horoscopes by date
userHoroscopeSchema.index({ userId: 1, generatedAt: -1 }, {});

export const UserHoroscopeModel = model<IUserHoroscope>(
  'UserHoroscope',
  userHoroscopeSchema,
);
