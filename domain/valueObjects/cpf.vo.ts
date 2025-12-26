export class CPF {
  private constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    const cleaned = this.value.replace(/\D/g, '');
    if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) {
      throw new Error('CPF inválido');
    }
    if (!this.isValidCPF(cleaned)) {
      throw new Error('CPF inválido');
    }
  }
  private isValidCPF(cpf: string): boolean {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;

    if (firstDigit !== parseInt(cpf.charAt(9))) {
      return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;
    return secondDigit === parseInt(cpf.charAt(10));
  }
  static create(cpf: string): CPF {
    const cleaned = cpf.replace(/\D/g, '');
    return new CPF(cleaned);
  }
  static restore(cpf: string): CPF {
    return new CPF(cpf);
  }
  getValue(): string {
    return this.value;
  }
}
