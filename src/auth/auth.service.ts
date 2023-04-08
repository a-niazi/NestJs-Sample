import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService} from '@nestjs/jwt'
import { CreateUserDto, UserInfoDto } from '../users/dto/'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt';
import { UserExistException, UserNotFoundException } from 'src/common/exceptions'
import { ConfigService } from '@nestjs/config';


 
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private readonly config: ConfigService,
    ){}
    
    async validateUserCredentials(
        username: string,
        password: string,
      ): Promise<any>{
        const user = await this.userService.getUser({ username, password});
    
        return user ?? null;
    }
    async loginWithCredentials(user: any){
        const payload = {username: user.email, sub:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user){
            throw new UserNotFoundException()
        }
        const isPasswordMatch = await bcrypt.compare(
            loginDto.password,
            user.password
        )
        if (!isPasswordMatch)
        {
            throw new HttpException("wrong password", 400);
        }
        const payload = {username: user.username, sub:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(userDto: CreateUserDto){
        const user = await this.userService.findByEmail(userDto.email)
        if (user){
            throw new UserExistException()
        }
        userDto.password = await bcrypt.hash(userDto.password, Number(this.config.get<string>('HASH_SALT')));
        await this.userService.createUser(userDto);
        const payload = {username: userDto.username, sub:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
