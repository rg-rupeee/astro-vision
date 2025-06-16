import { getEnvVar } from '@util/common';
import { IEnvironmentConfig, INodeEnv } from '../interface/environment';

export const BASE_CONFIG: IEnvironmentConfig = {
  PORT: parseInt(getEnvVar('PORT', '3000'), 10),

  NODE_ENV: getEnvVar('NODE_ENV', 'LOCAL') as INodeEnv,

  MORGAN_LOG_LEVEL: getEnvVar('MORGAN_LOG_LEVEL', 'dev'),

  LOG_LEVEL: getEnvVar('LOG_LEVEL', 'debug'),

  SWAGGER_ENABLED: getEnvVar('SWAGGER_ENABLED', 'true') === 'true',

  MONGODB_URI: getEnvVar('MONGODB_URI'),

  JWT_SECRET: getEnvVar('JWT_SECRET', 'my-secret-key'),

  SALT_ROUNDS: parseInt(getEnvVar('SALT_ROUNDS', '10'), 10),
} as const;

export default BASE_CONFIG;
