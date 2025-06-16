interface StatusCode {
  statusCode: number;
}

type StatusCodeMap = Record<string, StatusCode>;

export const ERROR_CODES: StatusCodeMap = {
  BAD_REQUEST: { statusCode: 400 },
  UNAUTHORIZED: { statusCode: 401 },
  FORBIDDEN: { statusCode: 403 },
  NOT_FOUND: { statusCode: 404 },
  INTERNAL_SERVER_ERROR: { statusCode: 500 },
  DEPENDENCY_FAILURE: { statusCode: 424 },
  UNPROCESSABLE_ENTITY: { statusCode: 422 },
  TOO_MANY_REQUESTS: { statusCode: 429 },
} as const;

export type ErrorCodeKeys = keyof typeof ERROR_CODES;

export const SUCCESS_CODES: StatusCodeMap = {
  CREATED: { statusCode: 201 },
  OK: { statusCode: 200 },
} as const;
