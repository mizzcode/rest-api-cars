import { Cars } from '../models/cars';
import { CarRepository } from '../repository/CarRepository';
export class CarService {
  carRepository: CarRepository;
  constructor() {
    this.carRepository = new CarRepository();
  }

  rupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
  };

  addCar = async (car: Cars) => {
    return await this.carRepository.save(car);
  };

  getCarAll = async () => {
    return await this.carRepository.findAll();
  };

  getCarById = async (id: string) => {
    return await this.carRepository.findById(id);
  };

  getCarByAvailableAt = async (rentalDate: Date) => {
    return await this.carRepository.findByAvailableAt(rentalDate);
  };

  editCar = async (id: string, car: Partial<Cars>) => {
    return await this.carRepository.updateById(id, car);
  };

  deleteCarById = async (id: string) => {
    return await this.carRepository.deleteById(id);
  };

  deleteCarAll = async () => {
    return await this.carRepository.deleteAll();
  };
}
