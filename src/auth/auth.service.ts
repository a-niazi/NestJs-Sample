import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService} from '@nestjs/jwt'
 
@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}
    
    async validateUserCredentials(
        username: string,
        password: string,
    ): Promise<any>{
        const user = await this.userService.getUser({username, password});

        return user ?? null;
    }

    async loginWithCredentials(user: any){
        const payload = {username: user.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
