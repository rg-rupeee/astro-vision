import { Schema, model } from 'mongoose';
import { IIdentity } from './identity.interface';

const identitySchema = new Schema<IIdentity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User',
    },
    password: {
      type: String,
      required: false,
    },
    passwordChangedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    passwordResetOTP: {
      type: String,
      required: false,
    },
    passwordResetExpires: {
      type: Date,
      required: false,
    },
    passwordResetAttempts: {
      type: Number,
      required: false,
      default: 0,
    },
    assignedTokens: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const IdentityModel = model<IIdentity>('Identity', identitySchema);
