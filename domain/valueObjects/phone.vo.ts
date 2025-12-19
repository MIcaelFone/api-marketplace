export class Phone {
  private constructor(
    private readonly countryCode: string,
    private readonly areaCode: string,
    private readonly number: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.countryCode.match(/^\+?\d{1,3}$/)) {
      throw new Error('Código de país inválido');
    }

    if (!this.areaCode.match(/^\d{2}$/)) {
      throw new Error('DDD inválido. Deve conter 2 dígitos');
    }

    if (!this.number.match(/^\d{8,9}$/)) {
      throw new Error('Número inválido. Deve conter 8 ou 9 dígitos');
    }
  }

  static create(phone: string): Phone {
    const cleaned = phone.replace(/\D/g, '');

    let countryCode = '+55';
    let areaCode: string;
    let number: string;

    if (cleaned.length === 13 && cleaned.startsWith('55')) {
      countryCode = '+55';
      areaCode = cleaned.substring(2, 4);
      number = cleaned.substring(4);
    } else if (cleaned.length === 11) {
      areaCode = cleaned.substring(0, 2);
      number = cleaned.substring(2);
    } else if (cleaned.length === 10) {
      areaCode = cleaned.substring(0, 2);
      number = cleaned.substring(2);
    } else {
      throw new Error(
        'Formato de telefone inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
      );
    }

    return new Phone(countryCode, areaCode, number);
  }

  static createWithParts(countryCode: string, areaCode: string, number: string): Phone {
    return new Phone(countryCode, areaCode, number);
  }

  static restore(countryCode: string, areaCode: string, number: string): Phone {
    return new Phone(countryCode, areaCode, number);
  }

  getValue(): string {
    return `${this.countryCode}${this.areaCode}${this.number}`;
  }

  getFormatted(): string {
    if (this.number.length === 9) {
      return `${this.countryCode} (${this.areaCode}) ${this.number.substring(0, 5)}-${this.number.substring(5)}`;
    }
    return `${this.countryCode} (${this.areaCode}) ${this.number.substring(0, 4)}-${this.number.substring(4)}`;
  }

  getAreaCode(): string {
    return this.areaCode;
  }

  getNumber(): string {
    return this.number;
  }

  getCountryCode(): string {
    return this.countryCode;
  }

  isMobile(): boolean {
    return this.number.length === 9;
  }

  equals(other: Phone): boolean {
    if (!other) return false;
    return (
      this.countryCode === other.countryCode &&
      this.areaCode === other.areaCode &&
      this.number === other.number
    );
  }
}