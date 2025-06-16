export interface StatusCode {
  statusCode: number;
}

type StatusCodeMap = Record<string, StatusCode>;

export const STATUS_CODES: StatusCodeMap = {
  /* Success */
  CREATED: { statusCode: 201 },
  OK: { statusCode: 200 },

  /* Failure */
  INTERNAL_SERVER_ERROR: { statusCode: 500 },
  BAD_REQUEST: { statusCode: 400 },
  UNAUTHORIZED: { statusCode: 401 },
  FORBIDDEN: { statusCode: 403 },
  NOT_FOUND: { statusCode: 404 },
  DEPENDENCY_FAILURE: { statusCode: 424 },
  UNPROCESSABLE_ENTITY: { statusCode: 422 },
  TOO_MANY_REQUESTS: { statusCode: 429 },
} as const;

export type StatusCodeKeys = keyof typeof STATUS_CODES;

export default STATUS_CODES;
