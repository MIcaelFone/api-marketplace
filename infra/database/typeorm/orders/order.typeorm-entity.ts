import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserTypeOrmEntity } from '../user/user.typeorm-entity';
import { AddressTypeOrmEntity } from '../address/address.typeorm-entity';
@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @Column()
  addressId: number;

  @ManyToOne(() => AddressTypeOrmEntity, (address) => address.id)
  @JoinColumn({ name: 'addressId' })
  address: AddressTypeOrmEntity;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ nullable: false })
  orderStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
