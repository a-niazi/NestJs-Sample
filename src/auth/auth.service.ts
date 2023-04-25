import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService} from '@nestjs/jwt'
import { CreateUserDto, UserInfoDto } from '../users/dto/'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt';
import { UserExistException, UserNotFoundException } from 'src/common/exceptions'
import { ConfigService } from '@nestjs/config';
import { JwtUtil } from './jwtUtils';

 
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly jwtUtil: JwtUtil,
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
        const payload = {username: user.username, userId:user.id};
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
        const payload = {username: userDto.username, userId:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async test(accessToken: string){
        try{
            const payload = await this.jwtUtil.decode(accessToken);
            setTimeout(()=> {
                console.log("sleep")
            }, 60000)
            console.log(payload.userID);
            const data = this.convertTime(new Date())
            console.log((await data).minutes);
          }
          catch(error){
            throw error;
          }
          
          
      }
    async convertTime(date: Date): Promise<{minutes: number,seconds: number}>{
        const remainingTime: number = date.getTime() - new Date().getTime();
        const minutes: number = Math.floor(remainingTime / 60000);
        const seconds: number = Math.floor((remainingTime - minutes * 60000) / 1000);
        return {minutes, seconds}
    }

}
