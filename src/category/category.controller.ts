import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller(
     {
    path: 'categories',
    version: '1',
    }
)

export class CategoryController{
    constructor(private readonly categoryService:CategoryService){}
    @Get()
    getAll(){
        return this.categoryService.findAll()
    }
}