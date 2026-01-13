import { PaymentStatusEnum } from '../../enum/payment-status.enum';
export class PaymentsEntity {
  constructor(
    private readonly id: number,
    private readonly orderId: number,
    private readonly amount: number,
    private paymentStatus: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {
    this.validate();
  }
  public validate(): void {
    if (this.id !== null && !Number.isInteger(this.id)) {
      throw new Error('ID must be an integer or null');
    }
    if (!Number.isInteger(this.orderId) || this.orderId <= 0) {
      throw new Error('Address ID must be a positive integer');
    }
    if (
      !Object.values(PaymentStatusEnum).includes(
        this.paymentStatus as keyof typeof PaymentStatusEnum,
      )
    ) {
      throw new Error('Invalid order status');
    }
    if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
      throw new Error('Created at must be a valid Date');
    }
    if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
      throw new Error('Updated at must be a valid Date');
    }
  }
  static create(id: number, productId: number, categoryId: number): PaymentsEntity {
    return new PaymentsEntity(
      id,
      productId,
      categoryId,
      PaymentStatusEnum.PENDING,
      new Date(),
      new Date(),
    );
  }
  static restore(
    id: number,
    productId: number,
    categoryId: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  ): PaymentsEntity {
    return new PaymentsEntity(id, productId, categoryId, status, createdAt, updatedAt);
  }
  completePayment(): void {
    if (this.paymentStatus !== PaymentStatusEnum.PENDING) {
      throw new Error('Only pending payments can be completed');
    }

    this.paymentStatus = PaymentStatusEnum.COMPLETED;
    this.updatedAt = new Date();
  }
  failPayment(): void {
    if (this.paymentStatus !== PaymentStatusEnum.PENDING) {
      throw new Error('Only pending payments can be failed');
    }
    this.paymentStatus = PaymentStatusEnum.FAILED;
    this.updatedAt = new Date();
  }
  refundPayment(): void {
    if (this.paymentStatus !== PaymentStatusEnum.COMPLETED) {
      throw new Error('Only completed payments can be refunded');
    }
    this.paymentStatus = PaymentStatusEnum.REFUNDED;
    this.updatedAt = new Date();
  }

  getId(): number {
    return this.id;
  }
  getOrderId(): number {
    return this.orderId;
  }
  getAmount(): number {
    return this.amount;
  }
  getPaymentStatus(): string {
    return this.paymentStatus;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
