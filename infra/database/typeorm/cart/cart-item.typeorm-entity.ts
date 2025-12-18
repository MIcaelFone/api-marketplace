import { Entity,PrimaryColumn,Column } from "typeorm";
@Entity('cart_items')
export class CartItemEntity{
    @PrimaryColumn()
    id: number
    @Column()
    cartID: number
    @Column()
    productID: number
    @Column()
    quantity: number
}