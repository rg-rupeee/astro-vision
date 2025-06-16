import { ErrorType } from '../../constant/errorTypes';
import { StatusCode } from '../../constant/statusCodes';

class AppError extends Error {
  private errorCode: string;
  private statusCode: number;
  private data: any;

  constructor(error: ErrorType, statusCodeKey: StatusCode, data?: any) {
    const { message, errorCode } = error;
    const { statusCode } = statusCodeKey;

    super(message);

    this.data = data;
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  getErrorResponse() {
    return {
      success: false,
      data: this.data,
      message: this.message,
      errorCode: this.errorCode,
    };
  }

  getStatusCode() {
    return this.statusCode;
  }

  static isAppError(error: any): error is AppError {
    return error instanceof AppError;
  }
}

export default AppError;
