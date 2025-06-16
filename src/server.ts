import App from 'app';
import logger from '@util/logger';
import { connectDatabases } from './database';
import Container from 'typedi';
import { serializeError } from '@util/error/transform';

process.on('uncaughtException', err => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.message || 'Unknown error');
  logger.debug(serializeError(err));
  process.exit(1);
});

process.on('unhandledRejection', err => {
  logger.error('UNHANDLED REJECTION!');
  logger.error(err instanceof Error ? err.message : 'Unknown error');
  logger.debug(serializeError(err));
});

const bootstrap = async () => {
  const app = Container.get(App);

  logger.debug('Connecting to Databases ...');
  try {
    await connectDatabases();
  } catch (error) {
    logger.error('Error connecting databases! Shutting down...', error);
    process.exit(1);
  }

  app.listen();

  app.initializeWebSocket();

  app.registerProcessEventHandlers();
};

bootstrap();
