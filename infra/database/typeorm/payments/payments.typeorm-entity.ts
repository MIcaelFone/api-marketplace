import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderTypeOrmEntity } from '../orders/order.typeorm-entity';

@Entity('payments')
export class PaymentsTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => OrderTypeOrmEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: OrderTypeOrmEntity;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: false })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
