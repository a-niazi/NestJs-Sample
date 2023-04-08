import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class UserInfoDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'username'})
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: 'password'})
  public password: string;

}