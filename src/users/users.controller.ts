import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { url } from 'inspector';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    findAll(): User[]{
        return this.usersService.findAll();
    }

    @Get('/:id')
    findById(@Param('id') id:string): User{
        return this.usersService.findById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User{
        return this.usersService.createUser(createUserDto);
    }

}
