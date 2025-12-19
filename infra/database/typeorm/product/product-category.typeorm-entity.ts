import { Entity,Column,PrimaryColumn } from "typeorm";
@Entity('product_categories')
export class ProductCategoryEntity{
    @PrimaryColumn()
    id: number
    @Column({ unique: true })
    name: string
    @Column()
    description: string
} 