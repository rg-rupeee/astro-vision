import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('User', userSchema);
