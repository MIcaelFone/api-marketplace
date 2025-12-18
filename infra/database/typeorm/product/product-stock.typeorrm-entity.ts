import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('product_stocks')
export class ProductStockEntity {
    @PrimaryColumn()
    id: number;
    @Column()
    productID: number;
    @Column()
    quantity: number;
}   