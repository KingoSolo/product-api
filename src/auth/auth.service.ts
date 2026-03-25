import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UserService,
        private readonly jwtService:JwtService
    ){}

    async signup(dto:SignupDto){
        const existingUser  = await this.usersService.findByEmail(dto.email)
        if (existingUser){
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
    const { password, ...safeUser } = user;

    return {
      message: 'User created successfully',
      access_token:  accessToken,
      user: safeUser,
    };
    }

     async login(dto:LoginDto){
        const user = await this.usersService.findByEmail(dto.email)

        if (!user){
            throw new UnauthorizedException("invalid credentials")
        }

        const match = await bcrypt.compare(dto.password,user.password)

        if(!match){
            throw new UnauthorizedException('invalid credentials')
        }

        const payload = {
            sub: user.id,
            email: user.email
        }

        const access_token = await this.jwtService.signAsync(payload)
        const {password, ...safeUser} = user

        return {
            message: "Login Successful",
            accessToken: access_token,
            user:safeUser
        }
        }

}
