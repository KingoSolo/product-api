import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[UserModule,PassportModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
       useFactory: (configService: ConfigService) => {
        const expiresIn = configService.getOrThrow<string>('JWT_EXPIRES_IN');

        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: expiresIn as SignOptions['expiresIn'],
          },
        };
      },
    }),
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
