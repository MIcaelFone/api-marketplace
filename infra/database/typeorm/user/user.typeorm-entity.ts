import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTypeTypeOrmEntity } from '../user/userType.typeorm-entity';

@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  isactive: boolean;

  @Column({ name: 'userTypeID', nullable: false })
  userTypeID: number;

  @ManyToOne(() => UserTypeTypeOrmEntity, (userType) => userType.id)
  @JoinColumn({ name: 'userTypeID' })
  userType: UserTypeTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
