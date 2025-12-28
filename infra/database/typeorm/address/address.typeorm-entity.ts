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
@Entity('addresses')
export class AddressTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  CEP: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
