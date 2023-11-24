import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export const authToken = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    // Leave the Bearer
    const token = bearerToken?.split('Bearer ')[1];

    const privateKey = readFileSync(path.join(process.cwd(), 'keys', 'jwtRS256.key'));
    console.log('authToken', privateKey);

    if (!token) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    jwt.verify(token, privateKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      // @ts-expect-error
      req.user = user;
      return next();
    });
  } catch (err: any) {
    console.error(err);
  }
};
