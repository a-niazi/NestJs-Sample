import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Delete, Patch, Query } from '@nestjs/common/decorators';
import { url } from 'inspector';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBasicAuth } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
    @Inject(UsersService)
    private readonly service: UsersService;

    @Get('/getAll')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getAllUsers() {
      return await this.service.getAllUsers();
    }

    @Get(':id')
    async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.service.findOne(id);
    }

    @Get('tell/:tell')
    async findUserBytell(@Param('tell', ) tell: string): Promise<User> {
        return await this.service.findByTell(tell);
    }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createUser(@Body() body: CreateUserDto): Promise<User> {
      return await this.service.createUser(body);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:number): Promise<void>{
        return await this.service.deleteUser(id);
    
    }
    
    // http://localhost:3000/users/:id/tell
    // @Patch('/:id/tell')
    // updateUserTell(@Param('id') id: string, @Body('tell') tell:string): User{
    //     return this.usersService.updateUserTell(id, tell);
    // }

}
