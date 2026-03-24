import { Product } from "../../products/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email : string

    @Column()
    phoneNumber: string

    @Column()
    password : string

    @OneToMany(()=>Product,(product) => product.owner)
    products : Product[]
}