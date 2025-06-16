import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BASE_CONFIG } from '@config/environment';
import AppError from '@util/error/AppError';
import { ERRORS } from '@constant/errorTypes';
import { STATUS_CODES } from '@constant/statusCodes';

interface AuthRequest extends Request {
  user?: {
    _id: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(ERRORS.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, BASE_CONFIG.JWT_SECRET) as {
      _id: string;
      userId: string;
      email: string;
    };

    req.user = decoded;
    req.user._id = decoded.userId;
  } catch (error) {
    throw new AppError(ERRORS.INVALID_TOKEN, STATUS_CODES.UNAUTHORIZED);
  }

  next();
};
