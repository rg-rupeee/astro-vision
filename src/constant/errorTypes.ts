export interface ErrorType {
  errorCode: string;
  message: string;
}

type ErrorMap = Record<string, ErrorType>;

export const ERRORS: ErrorMap = {
  INTERNAL_SERVER_ERROR: {
    errorCode: 'E00000',
    message: 'Something Went Wrong!',
  },
  VALIDATION_ERROR: {
    errorCode: 'E00100',
    message: 'Validation failed',
  },
  CAST_ERROR: {
    errorCode: 'E00101',
    message: 'Invalid value for field',
  },
  DUPLICATE_KEY_ERROR: {
    errorCode: 'E00102',
    message: 'Duplicate key error',
  },
  JSON_STRINGIFY_ERROR: {
    errorCode: 'E00103',
    message: 'JSON stringify error',
  },
  INVALID_TOKEN: {
    errorCode: 'E00001',
    message: 'Invalid token',
  },
  INVALID_REQUEST: {
    errorCode: 'E00002',
    message: 'Invalid or Missing Request Parameters',
  },
  USER_ALREADY_EXISTS: {
    errorCode: 'E00003',
    message: 'User already exists',
  },
  USER_NOT_FOUND: {
    errorCode: 'E00004',
    message: 'User not found',
  },
  INVALID_CREDENTIALS: {
    errorCode: 'E00005',
    message: 'Invalid credentials',
  },
  CITY_ALREADY_EXISTS: {
    errorCode: 'E00006',
    message: 'City with this name already exists',
  },
  CITY_NOT_FOUND: {
    errorCode: 'E00007',
    message: 'City not found',
  },
  CLUE_NOT_FOUND: {
    errorCode: 'E00008',
    message: 'Clue not found',
  },
  GAME_NOT_FOUND: {
    errorCode: 'E00009',
    message: 'Game not found',
  },
} as const;

export type ErrorTypeKeys = keyof typeof ERRORS;

export default ERRORS;
