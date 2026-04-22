import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product{
  id:string,
  name:string,
  price : number,
  description: string
}

@Controller({
  path: 'products',
  version: '1',
})

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
  update(@Param('id') id: string, @Body() updateProductDto : UpdateProductDto ) {
    return this.productsService.update(+id,updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }
}
