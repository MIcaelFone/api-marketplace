export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string = 'BRL',
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    if (!Number.isFinite(this.amount)) {
      throw new Error('Amount must be a valid number');
    }
    if (!this.currency || this.currency.trim() === '') {
      throw new Error('Currency is required');
    }
    if (this.currency.length !== 3) {
      throw new Error('Currency must be a 3-letter code (e.g., BRL, USD)');
    }
  }

  static create(amount: number, currency: string = 'BRL'): Money {
    // Arredonda para 2 casas decimais
    const roundedAmount = Math.round(amount * 100) / 100;
    return new Money(roundedAmount, currency.toUpperCase());
  }

  static restore(amount: number, currency: string = 'BRL'): Money {
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new Error('Result cannot be negative');
    }
    return Money.create(result, this.currency);
  }

  multiply(factor: number): Money {
    if (!Number.isFinite(factor)) {
      throw new Error('Factor must be a valid number');
    }
    return Money.create(this.amount * factor, this.currency);
  }

  divide(divisor: number): Money {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero');
    }
    if (!Number.isFinite(divisor)) {
      throw new Error('Divisor must be a valid number');
    }
    return Money.create(this.amount / divisor, this.currency);
  }

  isGreaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error('Cannot compare money with different currencies');
    }
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error('Cannot compare money with different currencies');
    }
    return this.amount < other.amount;
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  getFormatted(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  equals(other: Money): boolean {
    if (!other) return false;
    return this.amount === other.amount && this.currency === other.currency;
  }
}
