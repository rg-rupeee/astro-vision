import { Document, Types } from 'mongoose';

export interface IIdentity extends Document {
  user: Types.ObjectId;
  password?: string;
  passwordChangedAt?: Date;
  passwordResetOTP?: String;
  passwordResetExpires?: Date;
  passwordResetAttempts?: number;
  assignedTokens: [String];
}
