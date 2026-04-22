import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';





@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService
  ) {}

  getAll(){
    return this.productRepository.find();
  }

  async getById(id:number){
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product){
      throw new NotFoundException(`not found at ${id}`)
    }
    return product
  }

  async delete(id:number){
    const indexFound = await this.getById(id)
    if (!indexFound){
      throw new NotFoundException('Index not found')
    }

    await this.productRepository.delete(id)
    return indexFound
  }

  async update(id:number, dto:UpdateProductDto){
    const product = await this.getById(id)
    if (!product){
      throw new NotFoundException('Index not found')
    }
    await this.productRepository.update(id,dto)
    return this.productRepository.findOne({ where: { id } })

  }

  async create(dto:CreateProductDto){
    const category = await this.categoryService.findOne(dto.categoryId)
    const newProduct = this.productRepository.create({
      ...dto,
      category
    })
    return this.productRepository.save(newProduct)
  }
}


