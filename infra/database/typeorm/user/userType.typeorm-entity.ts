import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('users_types')
export class UserTypeTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true })
  name: string;
  @Column({ nullable: false })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
