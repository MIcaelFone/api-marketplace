export class ProductEntity {
  private constructor(
    private readonly id: number | null,
    private name: string,
    private description: string,
    private price: number,
    private stock: number,
    private readonly categoryId: number,
    private readonly sku: string,
    private readonly createdAt: Date,
    private updatedAt: Date | null,
  ) {
    this.validate();
  }
  public validate(): void {
    if (this.id !== null && !Number.isInteger(this.id)) {
      throw new Error('ID must be an integer or null');
    }
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required');
    }
    if (this.name.length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }
    if (this.description.trim() === '') {
      throw new Error('Description is required');
    }
    if (this.description.length < 50) {
      throw new Error('Description must be at least 50 characters long');
    }
    if (this.price < 0) {
      throw new Error('Price must be greater than or equal to zero');
    }
    if (!this.sku || this.sku.trim() === '') {
      throw new Error('SKU is required');
    }
    if (!Number.isInteger(this.categoryId) || this.categoryId <= 0) {
      throw new Error('Category ID must be a positive integer');
    }
    if (this.createdAt instanceof Date === false || isNaN(this.createdAt.getTime())) {
      throw new Error('Created at must be a valid Date');
    }
    if (this.updatedAt instanceof Date === false || isNaN(this.updatedAt.getTime())) {
      throw new Error('Updated at must be a valid Date');
    }
  }
  static create(
    name: string,
    description: string,
    price: number,
    categoryId: number,
    stock: number,
    sku: string,
  ): ProductEntity {
    return new ProductEntity(
      null,
      name,
      description,
      price,
      stock,
      categoryId,
      sku,
      new Date(),
      new Date(),
    );
  }
  static restore(
    id: number,
    name: string,
    categoryId: number,
    description: string,
    price: number,
    stock: number,
    sku: string,
    createdAt: Date,
    updatedAt: Date,
  ): ProductEntity {
    return new ProductEntity(
      id,
      name,
      description,
      price,
      stock,
      categoryId,
      sku,
      createdAt,
      updatedAt,
    );
  }
  incrementStock(amount: number): void {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error('Amount must be a positive integer');
    }
    this.stock += amount;
    this.updatedAt = new Date();
  }
  decrementStock(amount: number): void {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error('Amount must be a positive integer');
    }
    if (this.stock - amount < 0) {
      throw new Error('Insufficient stock');
    }
    this.stock -= amount;
    this.updatedAt = new Date();
  }
  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price must be greater than or equal to zero');
    }
    this.price = newPrice;
    this.updatedAt = new Date();
  }
  updateDescription(newDescription: string): void {
    if (newDescription.length > 500) {
      throw new Error('Description cannot exceed 500 characters');
    } else if (newDescription.trim() === '') {
      throw new Error('Description is required');
    }
    this.description = newDescription;
    this.updatedAt = new Date();
  }
  updateName(newName: string): void {
    if (!newName || newName.trim() === '') {
      throw new Error('Name is required');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }

  getId(): number | null {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getPrice(): number {
    return this.price;
  }
  getCategoryId(): number {
    return this.categoryId;
  }
  getStock(): number {
    return this.stock;
  }
  getSku(): string {
    return this.sku;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
