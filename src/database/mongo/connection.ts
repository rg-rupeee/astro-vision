import mongoose from 'mongoose';
import logger from '@util/logger';
import BASE_CONFIG from '@config/environment';

export class MongoConnection {
  private static instance: MongoConnection;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(BASE_CONFIG.MONGODB_URI);
      logger.info('Successfully connected to MongoDB Database');
    } catch (error) {
      logger.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Successfully disconnected from MongoDB');
    } catch (error) {
      logger.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }
}
