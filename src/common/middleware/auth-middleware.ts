import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AUTH MIDDLEWARE HIT');
    console.log(req.method, req.originalUrl);
    console.log('Authorization:', req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || token !== 'my-bearer-sample') {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}