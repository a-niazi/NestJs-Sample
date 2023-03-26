import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//import { IsPhoneNumber } from 'class-validator/types/decorator/decorators';

export class GetUserDto {
  
  @IsString()
  public tell: string;

}