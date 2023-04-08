import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class LoginDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    public email: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'password'})
    public password: string;
  
  }