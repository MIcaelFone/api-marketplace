import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserTypeTypeOrmEntity } from '../user/userType.typeorm-entity';
@Entity('users')
export class UserEntity {
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
  @Column({ nullable: false })
  @ManyToOne(() => UserTypeTypeOrmEntity)
  userTypeId: number;
  @Column({ nullable: false })
  createdAt: Date;
  @Column({ nullable: true })
  updatedAt: Date | null;
}
