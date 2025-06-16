import { Schema, model, Types } from 'mongoose';

export interface ICity {
  _id: Types.ObjectId;
  name: string;
  country: string;
  continent: string;
  funFact?: string[];
  trivia?: string[];
}

const citySchema = new Schema<ICity>(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    funFact: [{ type: String }],
    trivia: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const CityModel = model<ICity>('City', citySchema);
