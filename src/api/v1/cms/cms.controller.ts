import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import CMSService from './cms.service';
import catchAsync from '@middleware/catchAsync';

@Service()
export default class CMSController {
  constructor(private readonly cmsService: CMSService) {}

  public createCity = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const city = await this.cmsService.createCity(req.body);
      return res.status(201).json(city);
    },
  );

  updateCity = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const city = await this.cmsService.updateCity(req.params.id, req.body);
      if (!city) {
        return res.status(404).json({ message: 'City not found' });
      }
      return res.json(city);
    },
  );

  listAllCities = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_req: Request, res: Response, _next: NextFunction) => {
      const cities = await this.cmsService.listAllCities();
      return res.json(cities);
    },
  );

  getCity = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const city = await this.cmsService.getCity(req.params.id);
      if (!city) {
        return res.status(404).json({ message: 'City not found' });
      }
      return res.json(city);
    },
  );

  createClue = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const clue = await this.cmsService.createClue(req.body);
      return res.status(201).json(clue);
    },
  );

  updateClue = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const clue = await this.cmsService.updateClue(req.params.id, req.body);
      if (!clue) {
        return res.status(404).json({ message: 'Clue not found' });
      }
      return res.json(clue);
    },
  );

  listAllClues = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_req: Request, res: Response, _next: NextFunction) => {
      const clues = await this.cmsService.listAllClues();
      return res.json(clues);
    },
  );

  getClue = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const clue = await this.cmsService.getClue(req.params.id);
      if (!clue) {
        return res.status(404).json({ message: 'Clue not found' });
      }
      return res.json(clue);
    },
  );

  getRandomCitiesWithClues = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, _next: NextFunction) => {
      const { count } = req.query;
      const result = await this.cmsService.getRandomCitiesWithClues(
        Number(count),
      );
      return res.json(result);
    },
  );
}
