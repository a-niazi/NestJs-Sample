import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, UserInfoDto } from '../users/dto/'
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({description: 'User Login'})
  @ApiUnauthorizedResponse({description: 'invalid credentials'})
  @ApiBody({type: UserInfoDto})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: UserInfoDto) {
    return this.authService.loginWithCredentials(body);
  }


  @ApiOkResponse({description: 'User Login'})
  @ApiUnauthorizedResponse({description: 'invalid credentials'})
  @ApiBody({type: LoginDto})
  // @UseGuards(AuthGuard('local'))
  @Post('login_by_email')
  async newlogin(@Body() body: LoginDto) {
    return this.authService.login(body);
  }


  @ApiBody({type: CreateUserDto})
  @Post('register')
  async register(@Body() createDTO: CreateUserDto) {
      const user = await this.authService.register(createDTO);
      return user;
  }
}