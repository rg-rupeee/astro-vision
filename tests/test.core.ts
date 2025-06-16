import Container from 'typedi';
import App from '../src/app';
import { connectDatabases, disconnectDatabases } from '../src/database';
import models from '../src/repository';

const connectDB = async () => {
  await connectDatabases();
};

const disconnectDB = async () => {
  // Loop through all models and call deleteMany
  for (const model of Object.values(models) as any[]) {
    await (model as any).deleteMany({});
  }
  await disconnectDatabases();
};

export const bootstrap = async () => {
  const app = Container.get(App);
  await connectDB();
  app.listen();
  return app;
};

interface AppInstance {
  server?: {
    close: () => void;
  };
}

export const stop = async (app: AppInstance) => {
  app?.server?.close();
  await disconnectDB();
};
