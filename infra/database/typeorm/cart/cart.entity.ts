import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('carts')
export class CartTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  userID: number;
}
