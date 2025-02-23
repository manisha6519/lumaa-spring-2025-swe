// src/middleware/authMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'No token provided' });  // Send the response, don't return
    return;  // Terminate the middleware chain early
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized' });  // Send the response, don't return
      return;  // Terminate the middleware chain early
    }

    if (decoded && typeof decoded !== 'string') {
      req.userId = decoded.id; // Assuming `id` is in the payload
    } else {
      res.status(401).json({ message: 'Invalid token' });  // Send the response, don't return
      return;  // Terminate the middleware chain early
    }

    next();  // If everything is fine, proceed to the next middleware
  });
};

export default authMiddleware;

