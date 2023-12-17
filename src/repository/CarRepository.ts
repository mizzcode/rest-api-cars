import type { Cars } from '../models/cars'
import { CarsModel } from '../models/cars'

export class CarRepository {
    save = async (car: Cars): Promise<CarsModel> => {
        return await CarsModel.query().insert(car).returning('id')
    }

    findAll = async (): Promise<CarsModel[]> => {
        return await CarsModel.query()
    }

    findById = async (id: string): Promise<CarsModel | undefined> => {
        return await CarsModel.query().findById(id)
    }

    findByAvailableAt = async (rentalDate: Date): Promise<CarsModel[]> => {
        return await CarsModel.query().where('availableAt', '>', rentalDate).orderBy('availableAt')
    }

    updateById = async (id: string, car: Partial<Cars>): Promise<CarsModel[]> => {
        return await CarsModel.query().patch(car).where({ id }).throwIfNotFound().returning('*')
    }

    deleteById = async (id: string): Promise<number> => {
        return await CarsModel.query().deleteById(id)
    }

    deleteAll = async (): Promise<number> => {
        return await CarsModel.query().delete()
    }
}
