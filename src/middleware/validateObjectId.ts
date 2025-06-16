import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import AppError from '@util/error/AppError';
import STATUS_CODES from '@constant/statusCodes';

export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!id) {
      return next(
        new AppError(
          {
            errorCode: 'E00006',
            message: `${paramName} parameter is required`,
          },
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }

    if (!Types.ObjectId.isValid(id)) {
      return next(
        new AppError(
          {
            errorCode: 'E00007',
            message: `Invalid ${paramName} format. Must be a valid MongoDB ObjectId`,
          },
          STATUS_CODES.BAD_REQUEST,
        ),
      );
    }

    next();
  };
};
