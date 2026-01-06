import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => UserTypeTypeOrmEntity, (userType) => userType.id)
  @JoinColumn({ name: 'userType' })
  userType: number;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date | null;
}
