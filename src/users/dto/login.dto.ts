import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//import { IsPhoneNumber } from 'class-validator/types/decorator/decorators';

export class LoginUserDto {

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

}