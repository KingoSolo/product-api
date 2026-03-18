import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UserService,
        private readonly jwtService:JwtService
    ){}

    async Signup(dto:SignupDto){
        const existingUser  = await this.usersService.findByEmail(dto.email)
        if (!existingUser){
            throw new ConflictException("Email already exists") 
        }

        const hashedPassword = await bcrypt.hash(dto.password,10)
    
        const user = await this.usersService.create({
            ...dto,
            password: hashedPassword,
        });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'User created successfully',
      access_token: accessToken,
      user,
    };
    }
}
