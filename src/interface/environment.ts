export type INodeEnv = 'LOCAL' | 'STAG' | 'TEST' | 'PROD';

export interface IEnvironmentConfig {
  PORT: number;
  NODE_ENV: INodeEnv;
  MORGAN_LOG_LEVEL: string;
  LOG_LEVEL: string;
  SWAGGER_ENABLED: boolean;
  MONGODB_URI: string;
  JWT_SECRET: string;
  SALT_ROUNDS: number;
}

export interface IApiConfig {}
