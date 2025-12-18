import { Entity,Column,PrimaryColumn } from "typeorm";
@Entity('products')
export class ProductEntity{
    @PrimaryColumn()
    id: number
    @Column({ unique: true })
    name: string
    @Column()
    description: string
    @Column("decimal", { precision: 10, scale: 2 })
    price: number
    @Column()
    categoryID: number
    @Column()
    imagePath: string  
}