import { Body, Controller, Get, Post } from '@nestjs/common';
import { url } from 'inspector';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    findAll(): User[]{
        return this.usersService.findAll();
    }

    @Post()
    addUser(@Body('name') name, @Body('tell') tell): User{
        return this.usersService.addUser(name, tell);
    }

}
