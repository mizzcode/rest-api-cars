import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authToken = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;
    // Leave the Bearer
    const token = bearerToken?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    jwt.verify(token, 'cat', (err, user) => {
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
