export class CartItemEntity {
  constructor(
    private readonly id: number | null,
    private readonly productId: number,
    private quantity: number,
    private readonly priceAtTime: number,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private readonly cartID?: number,
  ) {
    this.validate();
  }
  static create(
    productId: number,
    quantity: number,
    priceAtTime: number,
    cartID: number,
  ): CartItemEntity {
    return new CartItemEntity(
      null,
      productId,
      quantity,
      priceAtTime,
      new Date(),
      new Date(),
      cartID,
    );
  }
  static restore(
    id: number,
    productId: number,
    quantity: number,
    priceAtTime: number,
    createdAt: Date,
    updatedAt: Date,
  ): CartItemEntity {
    return new CartItemEntity(id, productId, quantity, priceAtTime, createdAt, updatedAt);
  }

  public validate(): void {
    if (!Number.isInteger(this.id) && this.id < 0) {
      throw new Error('ID must be an integer and not negative.');
    }
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero.');
    }
    if (this.priceAtTime < 0) {
      throw new Error('Price at time cannot be negative.');
    }
    if (!Number.isInteger(this.quantity)) {
      throw new Error('Quantity must be an integer.');
    }
    if (!Number.isInteger(this.productId) || this.productId <= 0) {
      throw new Error('Product ID must be a positive integer.');
    }
    if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
      throw new Error('Created at must be a valid Date.');
    }
    if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
      throw new Error('Updated at must be a valid Date.');
    }
    if (!Number.isInteger(this.cartID) || this.cartID <= 0) {
      throw new Error('Cart ID must be a positive integer.');
    }
  }
  incrementQuantity(amount: number): void {
    if (amount <= 0 || !Number.isInteger(amount)) {
      throw new Error('Increment amount must be a positive integer.');
    }
    this.quantity += amount;
    this.updatedAt = new Date();
  }
  updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0 || !Number.isInteger(newQuantity)) {
      throw new Error('New quantity must be a positive integer.');
    }
    this.quantity = newQuantity;
    this.updatedAt = new Date();
  }
  getId(): number | null {
    return this.id;
  }
  getProductId(): number | null {
    return this.productId;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getpriceAtTime(): number {
    return this.priceAtTime;
  }
  getCreatedAt(): Date | null {
    return this.createdAt;
  }
  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
  getCartID(): number | null {
    return this.cartID;
  }
}
