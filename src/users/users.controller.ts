import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Delete, Patch, Query } from '@nestjs/common/decorators';
import { url } from 'inspector';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    @Inject(UsersService)
    private readonly service: UsersService;

    @Get(':id')
    public findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.service.findOne(id);
    }

    @Get()
    getAll() {
      return this.service.getAllUsers();
    }

    @Post()
    public createUser(@Body() body: CreateUserDto): Promise<User> {
      return this.service.createUser(body);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:number): Promise<void>{
        return this.service.deleteUser(id);
    }
    // @Get()
    // find(@Query() getUserDto: GetUserDto): User[]{
    //     if (Object.keys(getUserDto).length){
    //         return this.usersService.getUser(getUserDto);
    //     }
    //     return this.usersService.findAll();
    // }

    // @Get('/:id')
    // findById(@Param('id') id:string): User{
    //     return this.usersService.findById(id);
    // }

    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto): User{
    //     return this.usersService.createUser(createUserDto);
    // }

    // // http://localhost:3000/users/:id/tell
    // @Patch('/:id/tell')
    // updateUserTell(@Param('id') id: string, @Body('tell') tell:string): User{
    //     return this.usersService.updateUserTell(id, tell);
    // }

}
