export class  CEP {
    private static readonly CEP_REGEX = /^\d{5}-?\d{3}$/;
    private constructor(
        private readonly cep: string,
    ) {
        this.validate();
    }
    private validate(): void {
        if (!this.cep || this.cep.trim() === '') {
            throw new Error('CEP is required');
        }
        const cleanCep = this.cep.replace('-', '');
        if (cleanCep.length !== 8) {
            throw new Error('CEP must have 8 digits');
        }
        if (!CEP.CEP_REGEX.test(this.cep)) {
            throw new Error('CEP format is invalid');
        }
    }
    static create(cep: string): CEP {
        return new CEP(cep);
    }
    static restore(cep: string): CEP {
        return new CEP(cep);
    }
    getValue(): string {
        return this.cep.replace('-', '');
    }
    getFormatted(): string {
        return `${this.cep.substring(0, 5)}-${this.cep.substring(5)}`;
    }
    equals(other: CEP): boolean {
        return this.getValue() === other.getValue();
    }
}