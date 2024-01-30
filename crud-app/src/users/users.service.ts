import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}

    //get All the Users
    async findAll(): Promise<User[]> {
        return await this.usersRepo.find();
    }

    //get user By Id
    async findOne(id: number): Promise<User> {
        return await this.usersRepo.findOne({ where : {id} });
    }

    //create a User
    async create(user: User): Promise<User> {
        const newUser = this.usersRepo.create(user);
        return await this.usersRepo.save(newUser);
    }

    //update a User
    async update(id: number, user: User): Promise<User> {
        await this.usersRepo.update(id, user);
        return await this.usersRepo.findOne({ where: {id} });
    }

    //delete a User By Id
    async delete(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
