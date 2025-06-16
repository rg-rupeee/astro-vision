import 'reflect-metadata';
import hpp from 'hpp';
import cors from 'cors';
import http from 'http';
import YAML from 'yamljs';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';
import swaggerUi from 'swagger-ui-express';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import express, { Request, Response } from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import rateLimit from 'express-rate-limit';

import BASE_CONFIG from '@config/environment';
import logger, { stream } from '@util/logger';

import errorHandler from '@middleware/errorHandler';
import { resolve } from 'path';
import { loadRoutes } from '@api/routes';
import { disconnectDatabases } from '@database/index';
import { Service } from 'typedi';

@Service()
class App {
  public app: express.Application;
  public port: string | number;
  public server: http.Server | undefined;
  public io: SocketIOServer | undefined;

  constructor() {
    this.app = express();
    this.port = BASE_CONFIG.PORT;

    this.initializeMiddlewares();

    this.registerRoutes();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server listening on port :: ${this.port}`);
    });
    return this.server;
  }

  public initializeWebSocket() {
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', (socket: Socket) => {
      logger.info('New WebSocket connection established');

      socket.on('disconnect', () => {
        logger.info('WebSocket connection disconnected');
      });

      // TODO: Add WebSocket event handlers
    });
  }

  public registerProcessEventHandlers() {
    process.on('SIGTERM', async () => {
      logger.error('SIGTERM RECEIVED. Shutting down gracefully');
      await this.shutdown();
    });

    process.on('SIGINT', async () => {
      logger.error('SIGTERM RECEIVED. Shutting down gracefully');
      await this.shutdown();
    });
  }

  private initializeMiddlewares() {
    // Rate limiting: Prevent more than 5 API calls per minute per IP
    this.app.use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          status: 'fail',
          message: 'Too many requests, please try again after a minute.',
        },
      }),
    );

    // Helmet helps secure Express apps by setting various HTTP headers
    this.app.use(helmet());

    // Enable Cross-Origin Resource Sharing (CORS) for all routes
    this.app.use(cors());

    // Protect against cross-site scripting (XSS) attacks
    this.app.use(xss());

    // Protect against HTTP Parameter Pollution attacks
    this.app.use(hpp());

    // Sanitize user-supplied data to prevent MongoDB Operator Injection
    this.app.use(mongoSanitize());

    // Compress response bodies for all requests
    this.app.use(compression());

    // Parse incoming JSON requests and put the parsed data in req.body
    this.app.use(express.json());

    // Parse incoming requests with URL-encoded payloads
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }));

    // HTTP request logger middleware for node.js
    this.app.use(morgan(BASE_CONFIG.MORGAN_LOG_LEVEL, { stream }));
  }

  private registerRoutes() {
    if (BASE_CONFIG.SWAGGER_ENABLED) {
      this.serveSwagger();
    }

    this.app.use('/api', loadRoutes());

    this.app.all('*', (req: Request, res: Response) => {
      return res.status(404).json({
        success: false,
        status: 'fail',
        message: `Cannot find ${req.originalUrl} on this server!`,
      });
    });

    this.app.use(errorHandler);
  }

  private serveSwagger() {
    logger.debug('SWAGGER: Serving Docs');
    const swaggerDocument = YAML.load(resolve('docs/index.yaml'));
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private async shutdown() {
    this?.server?.close(async () => {
      logger.info('HTTP server closed');

      try {
        await disconnectDatabases();
        logger.info('Database connections closed');
      } catch (error) {
        logger.error('Error closing database connections:', error);
      }

      process.exit(0);
    });
  }
}

export default App;
