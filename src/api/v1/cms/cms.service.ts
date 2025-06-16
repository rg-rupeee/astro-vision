import { Service } from 'typedi';
import { CityRepository } from '@repository/city/city.repository';
import { ClueRepository } from '@repository/clue/clue.repository';
import { Types } from 'mongoose';
import { IClue } from '@repository/clue/clue.model';
import {
  CreateCityDto,
  CreateClueDto,
  UpdateCityDto,
  UpdateClueDto,
} from './cms.schema';
import AppError from '@util/error/AppError';
import STATUS_CODES from '@constant/statusCodes';
import ERRORS from '@constant/errorTypes';

@Service()
export default class CMSService {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly clueRepository: ClueRepository,
  ) {}

  createCity = async (data: CreateCityDto) => {
    try {
      const city = await this.cityRepository.create(data);
      return city;
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.name) {
        throw new AppError(
          ERRORS.CITY_ALREADY_EXISTS,
          STATUS_CODES.UNPROCESSABLE_ENTITY,
        );
      }
      throw error;
    }
  };

  updateCity = async (cityId: string, data: UpdateCityDto) => {
    const city = await this.cityRepository.update(cityId, data);
    if (!city) {
      throw new AppError(ERRORS.CITY_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return city;
  };

  listAllCities = async () => {
    const cities = await this.cityRepository.find({});
    return cities;
  };

  getCity = async (cityId: string) => {
    const city = await this.cityRepository.findById(cityId);
    if (!city) {
      throw new AppError(ERRORS.CITY_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return city;
  };

  createClue = async (data: CreateClueDto) => {
    const cityId = Types.ObjectId.createFromHexString(String(data.city));

    const clue = await this.clueRepository.create({
      ...data,
      city: cityId,
      options: data.options || [],
    });

    return clue;
  };

  updateClue = async (clueId: string, data: UpdateClueDto) => {
    const updateData: Partial<Omit<IClue, '_id'>> = {
      ...data,
    };

    const clue = await this.clueRepository.update(clueId, updateData);

    if (!clue) {
      throw new AppError(ERRORS.CLUE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    return clue;
  };

  listAllClues = async () => {
    const clues = await this.clueRepository.find({});
    return clues;
  };

  getClue = async (clueId: string) => {
    const clue = await this.clueRepository.findById(clueId);
    if (!clue) {
      throw new AppError(ERRORS.CLUE_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return clue;
  };

  getRandomCitiesWithClues = async (count: number) => {
    const k = Math.min(Number(count) || 5, 10);

    // Get random cities
    const cities = await this.cityRepository.find({});
    const randomCities = cities.sort(() => 0.5 - Math.random()).slice(0, k);

    // Get one random clue for each city
    const result = await Promise.all(
      randomCities.map(async city => {
        const clues = await this.clueRepository.find({ city: city._id });
        const randomClue = clues[Math.floor(Math.random() * clues.length)];
        return {
          city,
          clue: randomClue,
        };
      }),
    );

    return result;
  };
}
