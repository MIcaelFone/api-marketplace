import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('product_categories')
export class ProductCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  productId: number;
  @Column({ unique: true })
  categoryId: number;
  @CreateDateColumn({ unique: true })
  createdAt: Date;
  @UpdateDateColumn({ unique: true })
  updatedAt: Date;
}
