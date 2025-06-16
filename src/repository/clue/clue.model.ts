import { Schema, model, Types } from 'mongoose';

export interface IClue {
  _id: Types.ObjectId;
  city: Types.ObjectId;
  clue: string;
  difficulty: number;
  options: string[];
}

const clueSchema = new Schema<IClue>(
  {
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    clue: { type: String, required: true },
    difficulty: { type: Number, required: true, min: 1, max: 10 },
    options: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const ClueModel = model<IClue>('Clue', clueSchema);
