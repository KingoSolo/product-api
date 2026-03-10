import {Injectable,NestMiddleware,UnauthorizedException,} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
   
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const  token = authHeader

    if ( token !== 'my-bearer-sample') {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
