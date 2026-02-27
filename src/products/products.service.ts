import { Injectable, NotFoundException } from '@nestjs/common';

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
    return this.products.find((product) => product.id === id)
  
  }

  delete(id:number){
    const indexFound = this.products.findIndex((id) => id.id)
    if (indexFound == -1){
      throw new NotFoundException('Index not found')
    }
    this.products.splice(1,indexFound)
  }

  update(id:number, updateDate:{name?:string,price?:number,description?:string}){
    

  }

  create(created: {name:string;price:number;description:string}){
    const newProduct = {
      id: this.idCreator++,
      name: created.name,
      price: created.price,
      description: created.description
    }

    return this.products.push(newProduct)

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
}
