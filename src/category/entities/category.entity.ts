import { IsNotEmpty } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({unique:true,nullable:false})
    name!:string

    @Column({nullable:true})
    description?:string

    @CreateDateColumn()
    createdAt!:Date

    @UpdateDateColumn()
    updatedAt!:Date

    @OneToMany(() => Product, (product) => product.category)
    products!:Product[]

}