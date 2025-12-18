import {Entity, Column, PrimaryColumn, CreateDateColumn} from 'typeorm';
@Entity('orderItems')
export class OrderItemsEntity {
    @PrimaryColumn()
    id: number;
    @Column()
    orderID: number;
    @Column()
    productID: number;
    @Column()
    quantity: number;
    @CreateDateColumn()
    createdAt: Date;
}