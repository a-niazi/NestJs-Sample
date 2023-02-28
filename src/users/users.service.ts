import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuid} from 'uuid'

@Injectable()
export class UsersService {
    private users: User[] =  []

    findAll(){
        return this.users;
    }

    addUser(name:string, tell:string){
        const user:User = {
            id: uuid(),
            name,
            tell
        }
        
        this.users.push(user);

        return user;
    }

}
