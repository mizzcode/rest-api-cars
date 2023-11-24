import { Request, Response } from 'express';
import { CarService } from '../../../services/CarService';
import { Cars } from '../../../models/cars';
import cloudinary from '../../../config/cloudinary';

interface IParams {
  id: string;
}

export class CarsController {
  carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  postSaveCar = async (req: Request<{}, {}, Cars>, res: Response) => {
    try {
      if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Only role superadmin or admin!' });
      }
      // terima data json dari request
      const body = {
        ...req.body,
        // karena options dan specs value nya array maka harus dijadikan string
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        created_by: req.user.name,
        updated_by: req.user.name,
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
      const car = await this.carService.addCar(body);

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

  getCarAll = async (_: Request, res: Response) => {
    try {
      // select query
      const cars = await this.carService.getCarAll();
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

  getDetailCar = async (req: Request<IParams>, res: Response) => {
    try {
      const id = req.params.id;
      // select query berdasarkan id
      const car = await this.carService.getCarById(id);
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

  patchEditCar = async (req: Request<IParams>, res: Response) => {
    try {
      if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Only role superadmin or admin!' });
      }

      const id = req.params.id;
      // terima data json dari request
      const body = {
        ...req.body,
        // karena options dan specs value nya array maka harus dijadikan string
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        updated_by: req.user.name,
      };
      // update data car berdasarkan id
      const car = await this.carService.editCar(id, body);
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

  deleteCarById = async (req: Request<IParams>, res: Response) => {
    try {
      if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Only role superadmin or admin!' });
      }

      const id = req.params.id;
      // delete query berdasarkan id
      const car = await this.carService.deleteCarById(id);
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

  deleteCar = async (req: Request, res: Response) => {
    try {
      if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Only role superadmin or admin!' });
      }

      // delete query
      const car = await this.carService.deleteCarAll();
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
