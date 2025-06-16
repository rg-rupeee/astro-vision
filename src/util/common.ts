import { IEnvironmentConfig } from '@interface/environment';

export const getEnvVar = (
  key: keyof IEnvironmentConfig,
  defaultValue?: string,
): string => {
  const value = process.env[key as string];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue!;
};
