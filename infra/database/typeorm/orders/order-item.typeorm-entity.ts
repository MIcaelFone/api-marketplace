import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('order_items')
export class OrderItemTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  orderID: number;

  @Column({ nullable: false })
  productID: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, type: 'decimal' })
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
