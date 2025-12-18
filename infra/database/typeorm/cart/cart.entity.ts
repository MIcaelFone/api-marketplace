import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('carts')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userID: number;
}
