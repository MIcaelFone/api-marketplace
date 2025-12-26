import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('products')
export class ProductTypeOrmEntity {
  @PrimaryColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column()
  stock: number;
  @Column()
  categoryId: number;
  @Column({ unique: true })
  sku: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
