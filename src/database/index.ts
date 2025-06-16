import logger from '@util/logger';
import { MongoConnection } from './mongo/connection';

const connections: { mongo?: MongoConnection } = {};

const connectDatabases = async () => {
  try {
    connections.mongo = MongoConnection.getInstance();
    await connections.mongo.connect();
  } catch (error) {
    logger.error('Error connecting to databases:', error);
    throw error;
  }
};

const disconnectDatabases = async () => {
  try {
    if (connections.mongo) {
      await connections.mongo.disconnect();
    }
  } catch (error) {
    logger.error('Error disconnecting from databases:', error);
    throw error;
  }
};

export { connections, connectDatabases, disconnectDatabases };
