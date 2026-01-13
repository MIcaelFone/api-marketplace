import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderTypeOrmEntity } from './order.typeorm-entity';
import { ProductTypeOrmEntity } from '../product/product.typeorm-entity';
@Entity('order_items')
export class OrderItemTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => OrderTypeOrmEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: OrderTypeOrmEntity;

  @Column()
  productId: number;

  @ManyToOne(() => ProductTypeOrmEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductTypeOrmEntity;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  productSkuAtTime: string;

  @Column({ nullable: false })
  productNameAtTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
