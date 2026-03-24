import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly usersRepository : Repository <User>
    ){}

    async findAll(){
        return this.usersRepository.find()
    }

    async findById(id:number){
        return this.usersRepository.findOneBy({id})
    }

    async findByEmail(email:string){
        return this.usersRepository.findOneBy({email})
    }

    async create(data : Partial<User>){
        const newUser = this.usersRepository.create(data)
        return this.usersRepository.save(newUser)
    }

    async delete(id:number){
     const user = await this.findById(id);

    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    throw new NotFoundException('User not found');
    }
}