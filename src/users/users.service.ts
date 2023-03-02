import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuid} from 'uuid'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: User[] =  []

    findAll(): User[]{
        return this.users;
    }

    findById(id: string): User{
        return this.users.find((user) => user.id == id)
    }
    createUser(createUserDto: CreateUserDto): User{
        const { name , tell } =  createUserDto
        const user:User = {
            id: uuid(),
            name,
            tell
        }
        
        this.users.push(user);

        return user;
    }

}
