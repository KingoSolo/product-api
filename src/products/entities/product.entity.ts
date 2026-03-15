import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    createdAt:Date
    @Column()
    updatedDateColumn:Date

    @ManyToOne(() => User,(user)=>user.products)
    owner:User
    @Column()
    ownerId: string
}
