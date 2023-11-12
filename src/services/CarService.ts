import { Request, Response } from 'express';
import { Cars, CarsModel } from '../models/cars';
import cloudinary from '../config/cloudinary';

interface IParams {
  id: number;
}
interface IReqQuery {
  driver: number;
  date: string;
  pickupTime: string;
  totalPassenger: number;
}

export class CarService {
  static rupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(number);
  };

  static landingPage = (_: Request, res: Response) => {
    res.render('index');
  };

  static searchCars = async (req: Request<{}, {}, {}, IReqQuery>, res: Response) => {
    const { driver, date, pickupTime, totalPassenger } = req.query;

    const qCars = CarsModel.query();

    if (date && pickupTime) {
      const rentalDate = new Date(date + pickupTime);

      qCars.where('availableAt', '>', rentalDate).orderBy('availableAt');
    }

    const availableCars = await qCars;

    // mencari mobil dengan kapasitas terbesar
    const maxCarCapacity = Math.max(...availableCars.map((car: any) => car.capacity));

    const rupiah = CarService.rupiah;
    let foundCar = true;

    res.render('cars', { availableCars, driver, totalPassenger, maxCarCapacity, foundCar, rupiah });
  };

  // for API
  static saveCar = async (req: Request<{}, {}, Cars>, res: Response) => {
    try {
      // terima data json dari request
      const body = {
        ...req.body,
        // karena options dan specs value nya array maka harus dijadikan string
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
      };
      // mengubah file upload data biner/bytes menjadi format base64
      const fileBase64 = req.file?.buffer.toString('base64');
      // format data uri
      const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
      // cloudinary - cloud storage
      cloudinary.uploader
        .upload(file, {
          resource_type: 'image',
          public_id: 'cars',
          tags: ['car rental', 'rental car', 'binar car rental'],
        })
        .then((result) => {
          body.image = result.secure_url;
        });
      // insert query
      const car = await CarsModel.query().insert(body).returning('*');

      res.status(201).json({
        status: 'Success',
        message: 'Car was added successfully!',
        data: {
          carId: car.id,
        },
        statusCode: 201,
      });
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(400).json({
        status: 'Fail',
        message: err,
      });
    }
  };

  static getAllCar = async (_: Request, res: Response) => {
    try {
      // select query
      const cars = await CarsModel.query();
      // jika data nya kosong maka throw error
      if (cars.length < 1) throw new Error('All Car not found!');
      // kalau data cars nya ada maka kirim response data cars
      res.status(200).json(cars);
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(404).json({
        status: 'Fail',
        message: err.message,
        statusCode: 404,
      });
    }
  };

  static getDetailCar = async (req: Request<IParams>, res: Response) => {
    try {
      // mengubah id menjadi number
      const id = +req.params.id;
      // select query berdasarkan id
      const car = await CarsModel.query().findById(id);
      // jika data nya tidak ada throw error
      if (car === undefined) throw new Error('Car not found!');
      // kalau data nya ada maka kirim response data car
      res.status(200).json(car);
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(404).json({
        status: 'Fail',
        message: err.message,
        statusCode: 404,
      });
    }
  };

  static editCar = async (req: Request<IParams>, res: Response) => {
    try {
      // mengubah id menjadi number
      const id = +req.params.id;
      // terima data json dari request
      const body = {
        ...req.body,
        // karena options dan specs value nya array maka harus dijadikan string
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
      };
      // update data car berdasarkan id
      const car = await CarsModel.query().findById(id).patch(body);
      // jika data car tidak ditemukan maka throw error
      if (!car) throw new Error('Car not found!');
      // kalau data car nya ada dan berhasil di update maka kirim response berhasil
      res.status(200).json({
        status: 'Success',
        message: 'Car was updated successfully!',
        statusCode: 200,
      });
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(404).json({
        status: 'Fail',
        message: err.message,
        statusCode: 404,
      });
    }
  };

  static deleteCarById = async (req: Request<IParams>, res: Response) => {
    try {
      // mengubah id menjadi number
      const id = +req.params.id;
      // delete query berdasarkan id
      const car = await CarsModel.query().deleteById(id);
      // jika id tidak ditemukan maka throw error
      if (!car) throw new Error('Car not found!');
      // kalau id di temukan dan berhasil di hapus maka kirim response
      res.status(200).json({
        status: 'Success',
        message: `Car was deleted successfully!`,
        statusCode: 200,
      });
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(404).json({
        status: 'Fail',
        message: err.message,
        statusCode: 404,
      });
    }
  };

  static deleteCar = async (_: Request, res: Response) => {
    try {
      // delete query
      const car = await CarsModel.query().delete();
      // jika data cars tidak ada maka throw error
      if (!car) throw new Error('Data Cars not found!');
      // kalau data cars ada dan berhasil di hapus maka kirim response
      res.status(200).json({
        status: 'Success',
        message: 'All Car deleted successfully!',
        statusCode: 200,
      });
      // jika ada error maka akan ditangkap sehingga server tetap bekerja dengan baik
    } catch (err: any) {
      res.status(404).json({
        status: 'Fail',
        message: err.message,
        statusCode: 404,
      });
    }
  };
}
