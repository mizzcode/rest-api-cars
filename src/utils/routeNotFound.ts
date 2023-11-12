import { Request, Response } from 'express';

export const routeNotFound = async (req: Request, res: Response) => {
  // jika ada request dengan endpoint selain yang di daftarkan di app express nya, kirim response endpoint belum di daftarkan
  res.status(404).json({
    status: 'Fail',
    message: `Endpoint ${req.originalUrl} is not registered on the server!`,
    statusCode: 404,
  });
};
