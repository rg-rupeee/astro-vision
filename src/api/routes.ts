import { Router } from 'express';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import logger from '@util/logger';

const isDirectory = (folder: string, source: string): boolean =>
  lstatSync(join(folder, source)).isDirectory();

const loadRoutes = (): Router => {
  const router = Router();
  const baseDir = __dirname;

  readdirSync(baseDir)
    .filter(file => isDirectory(baseDir, file))
    .forEach(file => {
      const moduleRouter = Router();
      const currentDir = join(baseDir, file);

      readdirSync(currentDir)
        .filter(module => isDirectory(currentDir, module))
        .forEach(module => {
          const routeFile = join(currentDir, module, `${module}.route`);
          const route = require(routeFile).default;
          moduleRouter.use(`/${module}`, route);
          logger.info(`Loaded API: ${file}/${module}`);
        });

      router.use(`/${file}`, moduleRouter);
    });

  return router;
};

export { loadRoutes };
