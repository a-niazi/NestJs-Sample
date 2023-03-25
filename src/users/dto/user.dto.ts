import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//import { IsPhoneNumber } from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;
  
  @IsString()
  public tell: string;

}