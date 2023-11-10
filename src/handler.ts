import { Request, Response } from 'express';
import { Cars, CarsModel } from './models/cars';
import cloudinary from './config/cloudinary';

interface IParams {
  id: number;
}
interface IReqQuery {
  driver: boolean;
  date: string;
  pickupTime: string;
  totalPassenger: number;
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const populateCars = (cars: any) => {
  return cars.map((car: any) => {
    const isPositive = getRandomInt(0, 1) === 1;
    const timeAt = new Date();
    // date + 3 day
    const mutator = getRandomInt(10_000_000, 300_000_000);
    const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator));

    return {
      ...car,
      availableAt,
    };
  });
};

// method format number to rupiah idr currency
const rupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(number);
};

const landingPage = (_: Request, res: Response) => {
  res.render('index');
};

const searchCars = async (req: Request<{}, {}, {}, IReqQuery>, res: Response) => {
  const { driver, date, pickupTime, totalPassenger } = req.query;

  const cars = populateCars(await CarsModel.query());

  const rentalDate = new Date(date + pickupTime).getTime();

  const availableCars = cars.filter((car: any) => car.availableAt > rentalDate);

  console.log(availableCars);

  // mencari mobil dengan kapasitas terbesar
  const maxCarCapacity = Math.max(...availableCars.map((car: any) => car.capacity));

  let foundCar = true;

  res.render('cars', { availableCars, driver, totalPassenger, maxCarCapacity, foundCar, rupiah });
};

// for API
const saveCar = async (req: Request<{}, {}, Cars>, res: Response) => {
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

const getAllCar = async (_: Request, res: Response) => {
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

const getDetailCar = async (req: Request<IParams>, res: Response) => {
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

const editCar = async (req: Request<IParams>, res: Response) => {
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

const deleteCarById = async (req: Request<IParams>, res: Response) => {
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

const deleteCar = async (_: Request, res: Response) => {
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

const routeNotFound = async (req: Request, res: Response) => {
  // jika ada request dengan endpoint selain yang di daftarkan di atas maka kirim response endpoint belum di daftarkan
  res.status(404).json({
    status: 'Fail',
    message: `Endpoint ${req.originalUrl} is not registered on the server!`,
    statusCode: 404,
  });
};

export { landingPage, searchCars, saveCar, getAllCar, getDetailCar, editCar, deleteCarById, deleteCar, routeNotFound };
