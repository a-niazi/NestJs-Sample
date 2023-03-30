import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'name'})
  public name: string;

  @IsEmail()
  @ApiProperty({type: String, description: 'email'})
  public email: string;
  
  @IsString()
  @ApiProperty({type: String, description: 'tell'})
  public tell: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'username'})
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'password'})
  public password: string;

}