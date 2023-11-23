import { Cars, CarsModel } from '../models/cars';

export class CarRepository {
  save = async (car: Cars) => {
    return await CarsModel.query().insert(car).returning('id');
  };

  findAll = async () => {
    return await CarsModel.query();
  };

  findById = async (id: string) => {
    return await CarsModel.query().findById(id);
  };

  findByAvailableAt = async (rentalDate: Date) => {
    return await CarsModel.query().where('availableAt', '>', rentalDate).orderBy('available_at');
  };

  updateById = async (id: string, car: Partial<Cars>) => {
    return await CarsModel.query().patch(car).where({ id }).throwIfNotFound().returning('*');
  };

  deleteById = async (id: string) => {
    return await CarsModel.query().deleteById(id);
  };

  deleteAll = async () => {
    return await CarsModel.query().delete();
  };
}
