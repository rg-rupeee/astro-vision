import { NextFunction, Request, Response } from 'express';

import AppError from '@util/error/AppError';
import logger from '@util/logger';
import { STATUS_CODES } from '@constant/statusCodes';
import ERRORS from '@constant/errorTypes';
import { serializeError } from '@util/error/transform';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  // Handle custom AppError
  if (AppError.isAppError(err)) {
    return res.status(err.getStatusCode()).json(err.getErrorResponse());
  }

  // Handle body-parser JSON parse error
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
      errorCode: 'E00104',
      details: err.message,
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const AppErr = new AppError(
      ERRORS.VALIDATION_ERROR,
      STATUS_CODES.BAD_REQUEST,
      err.errors || err.message,
    );
    return res.status(AppErr.getStatusCode()).json(AppErr.getErrorResponse());
  }

  // Handle Mongoose CastError
  if (err.name === 'CastError') {
    const AppErr = new AppError(ERRORS.CAST_ERROR, STATUS_CODES.BAD_REQUEST, {
      path: err.path,
      value: err.value,
      message: err.message,
    });
    return res.status(AppErr.getStatusCode()).json(AppErr.getErrorResponse());
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const AppErr = new AppError(
      ERRORS.DUPLICATE_KEY_ERROR,
      STATUS_CODES.CONFLICT,
      {
        keyValue: err.keyValue,
        message: err.message,
      },
    );
    return res.status(AppErr.getStatusCode()).json(AppErr.getErrorResponse());
  }

  // Handle JSON stringify error (circular structure)
  if (
    err instanceof TypeError &&
    typeof err.message === 'string' &&
    err.message.includes('circular structure')
  ) {
    const AppErr = new AppError(
      ERRORS.JSON_STRINGIFY_ERROR,
      STATUS_CODES.BAD_REQUEST,
      err.message,
    );
    return res.status(AppErr.getStatusCode()).json(AppErr.getErrorResponse());
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
