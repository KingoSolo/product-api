import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

export interface Product{
  id:string,
  name:string,
  price : number,
  description: string
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body()body :{id:number,name:string;price:number;description:string}) {
    return this.productsService.create(body);
  }

  @Get()
  findAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: {name?:string,price?:number,description?:string}) {
    return this.productsService.update(+id,body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
