import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { User } from './user.model';
import { v4 as uuid} from 'uuid'
import { CreateUserDto } from './dto/user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { LoginUserDto } from './dto/login.dto'
import { User } from './user.entity';
import { UserNotFoundException } from 'src/common/exceptions/userNotFoundException.exception';


@Injectable()
export class UsersService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

     // find(getUserDto: GetUserDto) : User[] {
    //     let users = this.findAll();
    //     const { name, tell } = getUserDto;
    //     if (name){
    //         users = users.filter((user) => user.name.toLowerCase().includes(name))
    //     }
    //     if (tell){
    //         users = users.filter((user) => user.tell == tell)
    //     }
    //     return users;
        
    // }
    public findOne(id: number): Promise<User | undefined> {
        return this.repository.findOneBy({id: id});
    }

    async findByTell(tell: string): Promise<User> {
        const user = await this.repository.findOne(
            { where:
                { tell: tell }
            }
        );
        return user;
      }
    async getUser(body: LoginUserDto): Promise<User | undefined>{
        return this.repository.findOne(
        {
            where: {
                username: body.username,
                password: body.password
            }
        })
    }
    async getUserOld({username, password}): Promise<User | undefined>{
        return this.repository.findOne({
            where: {
                username: username,
                password: password
            }
        })
    }
    async findByQuery(body: GetUserDto): Promise<User[]> {
        const users = await this.repository.find(
            { where:
                { 
                    tell: body.tell,
                }
            }
        );
        return users;
      }
    async getAllUsers(): Promise<User[]> {
        return await this.repository.find();
    }
    public createUser(body: CreateUserDto): Promise<User> {
        const user: User = new User();

        user.name = body.name;
        user.tell = body.tell;
        user.email = body.email;
        user.username = body.username;
        user.password = body.password;

        return this.repository.save(user);
    }
    async deleteUser(id: number): Promise<void> {
        const restoreResponse = await this.repository.delete(id);
        if (!restoreResponse.affected) {
          throw new UserNotFoundException(id);
        }
    }

    // updateUserTell(id: string, tell:string): User{
    //     const user = this.findById(id);
    //     user.tell = tell;
    //     return user;
    // }

}
