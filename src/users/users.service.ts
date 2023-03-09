import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuid} from 'uuid'
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    private users: User[] =  []

    findAll(): User[]{
        return this.users;
    }

    find(getUserDto: GetUserDto) : User[] {
        let users = this.findAll();
        const { name, tell } = getUserDto;
        if (name){
            users = users.filter((user) => user.name.toLowerCase().includes(name))
        }
        if (tell){
            users = users.filter((user) => user.tell == tell)
        }
        return users;
        
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

    deleteUser(id: string): void {
        this.users = this.users.filter((user) => user.id !== id);
    }

    updateUserTell(id: string, tell:string): User{
        const user = this.findById(id);
        user.tell = tell;
        return user;
    }

}
