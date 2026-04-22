import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>){}

        async findAll(){
            return await this.categoryRepository.find()
        }

        async findOne(id:number){
            const category = await this.categoryRepository.findOne({where:{id}})
            if(!category)
                throw new NotFoundException(`category with id: ${id} not found`)
            return category
        }
}