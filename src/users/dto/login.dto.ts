import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'email'})
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'password'})
  public password: string;

}