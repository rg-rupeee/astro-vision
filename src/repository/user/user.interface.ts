import { Document, Types } from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
  name: string;
  email: string;
  birthdate: Date;
  zodiac: string;
}
