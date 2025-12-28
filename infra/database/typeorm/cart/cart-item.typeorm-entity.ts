import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CartTypeOrmEntity } from './cart.entity';
import { ProductTypeOrmEntity } from '../product/product.typeorm-entity';
@Entity('cart_items')
export class CartItemTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;

  @ManyToOne(() => CartTypeOrmEntity, (cart) => cart.id)
  @JoinColumn({ name: 'cartId' })
  cart: CartTypeOrmEntity;

  @Column()
  productId: number;

  @ManyToOne(() => ProductTypeOrmEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductTypeOrmEntity;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  priceAtTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
