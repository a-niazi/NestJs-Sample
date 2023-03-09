import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Patch, Query } from '@nestjs/common/decorators';
import { url } from 'inspector';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    find(@Query() getUserDto: GetUserDto): User[]{
        if (Object.keys(getUserDto).length){
            return this.usersService.find(getUserDto);
        }
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

    @Delete('/:id')
    deleteUser(@Param('id') id:string): void{
        return this.usersService.deleteUser(id);
    }
    // http://localhost:3000/users/:id/tell
    @Patch('/:id/tell')
    updateUserTell(@Param('id') id: string, @Body('tell') tell:string): User{
        return this.usersService.updateUserTell(id, tell);
    }

}
