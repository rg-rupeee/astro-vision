import { NextFunction, Request, Response } from 'express';

type requestController<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const catchAsync =
  <T extends Request = Request>(fn: requestController<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req as T, res, next).catch(next);
  };

export default catchAsync;
