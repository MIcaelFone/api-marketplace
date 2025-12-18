export class UserTypeEntity { 
    private constructor(
        private readonly id: number | null,
        private typeName: string,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        this.validate();
    }   
    public validate(): void {
        if (this.id !== null && !Number.isInteger(this.id)) {
            throw new Error('ID must be an integer or null');
        }
        if (!this.typeName || this.typeName.trim() === '') {
            throw new Error('Type name is required');
        }
        if(this.typeName.length < 3){
            throw new Error('Type name must be at least 3 characters long');
        }
        if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
            throw new Error('Created at must be a valid Date');
        }
        if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
            throw new Error('Updated at must be a valid Date');
        }
    }
    static create(typeName: string): UserTypeEntity {
        return new UserTypeEntity(
            null,
            typeName,
            new Date(),
            new Date()
        );
    }
    static restore(id: number, typeName: string, createdAt: Date, updatedAt: Date): UserTypeEntity {
        return new UserTypeEntity(
            id,
            typeName,
            createdAt,
            updatedAt
        );
    }
    updateTypeName(newTypeName: string): void {
        if (!newTypeName || newTypeName.trim() === '') {
            throw new Error('Type name is required');
        }
        else if(newTypeName.length < 3){
            throw new Error('Type name must be at least 3 characters long');
        }
        this.typeName = newTypeName;
        this.updatedAt = new Date();
    }
    getId(): number | null {
        return this.id;
    }
    getTypeName(): string {
        return this.typeName;
    }   
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }
}