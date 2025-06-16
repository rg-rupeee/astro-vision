import { ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';

import ERRORS from '@constant/errorTypes';
import AppError from '@util/error/AppError';
import STATUS_CODES from '@constant/statusCodes';

export const zodValidator =
  (
    validationSchema: ZodSchema,
    path: 'params' | 'body' | 'query' | 'headers',
  ) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const result = validationSchema.safeParse(req[path]);

    if (!result.success) {
      next(
        new AppError(ERRORS.INVALID_REQUEST, STATUS_CODES.BAD_REQUEST, result),
      );
    }

    next();
  };
