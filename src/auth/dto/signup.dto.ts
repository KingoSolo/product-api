import { IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches } from "class-validator"

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be valid E.164 format',
  })
    phoneNumber : string
    
    @IsStrongPassword()
    @IsNotEmpty()
    @IsString()
    password:string
}