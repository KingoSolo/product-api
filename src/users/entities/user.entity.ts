import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName: string

    @Column()
    secondName: string

    @Column({select:false})
    password : string

    @OneToMany(()=>Product,(product) => product)
    products : Product[]
}