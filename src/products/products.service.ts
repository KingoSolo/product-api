import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

export interface Product{
  id:number,
  name:string,
  price : number,
  description: string
}



@Injectable()
export class ProductsService {

private products: Product[] = [
  { id:1,name:"car",price:300,description:"it is very fast"},
  { id:2,name:"shirts",price:500,description:"designer luxury brand"}
]

idCreator: number = Math.floor(Math.random()*100)

  getAll(){
    return this.products;
  }

  getById(id:number){
    const product = this.products.find((product) => product.id === id)
    if (!product){
      throw new NotFoundException(`not found at ${product}`)
    }
  return product
  }

  delete(id:number){
    const indexFound = this.products.findIndex((ind) => ind.id === id)
    if (indexFound == -1){
      throw new NotFoundException('Index not found')
    }
    this.products.splice(indexFound,1)
    return this.products
  }

  update(id:number, updateData:{name?:string,price?:number,description?:string}){
    const indexFound = this.products.findIndex((ind) => ind.id === id)
    if (indexFound == -1){
      throw new NotFoundException('Index not found')
    }
    this.products[indexFound]={
      ...this.products[indexFound],...updateData
    }
    return this.products[indexFound]

  }

  create(created: {name:string;price:number;description:string}){
    const newProduct = {
      id: this.idCreator++,
      ...created
    }
     this.products.push(newProduct)
  }
}


//   create(createProductDto: CreateProductDto) {
//     return 'This action adds a new product';
//   }

//   findAll() {
//     return `This action returns all products`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} product`;
//   }

//   update(id: number, updateProductDto: UpdateProductDto) {
//     return `This action updates a #${id} product`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} product`;
//   }

