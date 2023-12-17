import type { Cars, CarsModel } from '../models/cars'
import { CarRepository } from '../repository/CarRepository'
export class CarService {
    carRepository: CarRepository
    constructor() {
        this.carRepository = new CarRepository()
    }

    rupiah = (number: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(number)
    }

    addCar = async (car: Cars): Promise<CarsModel> => {
        return await this.carRepository.save(car)
    }

    getCarAll = async (): Promise<CarsModel[]> => {
        return await this.carRepository.findAll()
    }

    getCarById = async (id: string): Promise<CarsModel | undefined> => {
        return await this.carRepository.findById(id)
    }

    getCarByAvailableAt = async (rentalDate: Date): Promise<CarsModel[]> => {
        return await this.carRepository.findByAvailableAt(rentalDate)
    }

    editCar = async (id: string, car: Partial<Cars>): Promise<CarsModel[]> => {
        return await this.carRepository.updateById(id, car)
    }

    deleteCarById = async (id: string): Promise<number> => {
        return await this.carRepository.deleteById(id)
    }

    deleteCarAll = async (): Promise<number> => {
        return await this.carRepository.deleteAll()
    }
}
