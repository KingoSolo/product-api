import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';

@Module({
  imports:[UserModule,PassportModule,JwtModule.registerAsync({
    imports:[ConfigModule],
       useFactory: (configService: ConfigService) => {
        const expiresIn = configService.getOrThrow<string>('JWT_EXPIRATION_TIME');

        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: expiresIn as JwtSignOptions['expiresIn'],
          },
      inject: [ConfigService],
    }}})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
