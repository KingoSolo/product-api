import { Category } from "src/category/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!:number
    @Column()
    name!:string
    @CreateDateColumn()
    createdAt!:Date
    @UpdateDateColumn()
    updatedAt!:Date
    @Column()
    price!:number

    @ManyToOne(() => User,(user)=>user.products)
    owner!:User
    @Column()
    ownerId!: string

    @ManyToOne(()=> Category,(category)=>category.products)
    category!:Category

    @Column({nullable:true})
    categoryId!:number
}
