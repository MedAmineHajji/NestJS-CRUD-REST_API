import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    //get all users
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    //get User By Id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.findOne(id);

        if(!user){
            throw new Error('User not found');
        }else{
            return user;
        }
    }

    //create User
    @Post()
    async create(@Body() user: User): Promise<User> {

        return await this.usersService.create(user);
    }

    //update User
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User>{
        return this.usersService.update(id, user);
    }

    //delete a User By Id
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const user = await this.usersService.findOne(id);

        if(!user){
            throw new Error('User not Found');
        }
        return this.usersService.delete(id);
    }
}
