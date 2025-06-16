import { NextFunction, Request, Response } from 'express';

import AppError from '@util/error/AppError';
import logger from '@util/logger';
import { STATUS_CODES } from '@constant/statusCodes';
import ERRORS from '@constant/errorTypes';
import { serializeError } from '@util/error/transform';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (AppError.isAppError(err)) {
    return res.status(err.getStatusCode()).json(err.getErrorResponse());
  }

  logger.error(err);
  logger.debug(serializeError(err));

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR.statusCode).json({
    success: false,
    status: 'error',
    message: ERRORS.INTERNAL_SERVER_ERROR.message,
    errorCode: ERRORS.INTERNAL_SERVER_ERROR.errorCode,
  });
};

export default errorHandler;
