import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login.dto'
import { CreateUserDto } from '../users/dto/user.dto'
import { ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({description: 'User Login'})
  @ApiUnauthorizedResponse({description: 'invalid credentials'})
  @ApiBody({type: LoginUserDto})
  @UseGuards(AuthGuard('local'))
  @Post('login')
  // async login(@Request() req) {
  //   return this.authService.loginWithCredentials(req.body);
  // }
  async login(@Body() body: LoginUserDto) {
    return this.authService.loginWithCredentials(body);
  }

  @ApiBody({type: CreateUserDto})
  @Post('register')
  async register(@Body() createDTO: CreateUserDto) {
      const user = await this.authService.register(createDTO);
      return user;
  }
}