import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserTypeOrmEntity } from '../user/user.typeorm-entity';
@Entity('carts')
export class CartTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
