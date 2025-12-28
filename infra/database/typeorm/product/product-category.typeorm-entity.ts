import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductTypeOrmEntity } from './product.typeorm-entity';
import { CategoryTypeOrmEntity } from '../categories/category.typeorm-entity';
@Entity('product_categories')
export class ProductCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductTypeOrmEntity, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductTypeOrmEntity;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryTypeOrmEntity, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
