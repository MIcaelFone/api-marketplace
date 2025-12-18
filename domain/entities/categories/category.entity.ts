export class CategoryEntity {
    private constructor(
        private readonly id: number | null,
        private name: string,
        private description: string,
        private readonly createdAt: Date,
        private updatedAt: Date | null,
    ) {
        this.validate();
    }
    public validate(): void {
        if (!Number.isInteger(this.id) && this.id !== null) {
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
        if (this.description.length < 30) {
            throw new Error('Description cannot exceed 30 characters');
        }
    }
    static create(name: string, description: string): CategoryEntity {
        return new CategoryEntity(
            null,
            name,
            description,
            new Date(),
            new Date()
        );
    }
    static restore(id: number, name: string, description: string, createdAt: Date, updatedAt: Date): CategoryEntity {
        return new CategoryEntity(
            id,
            name,
            description,
            createdAt,
            updatedAt
        );
    }
   updateName(newName: string): void {
        if (!newName || newName.trim() === '') {
            throw new Error('Name is required');
        }
        if (newName.length < 3) {
            throw new Error('Name must be at least 3 characters long');
        }
        this.name = newName;
        this.updatedAt = new Date();
    }
    updateDescription(newDescription: string): void {
        if (newDescription.length > 300) {
            throw new Error('Description cannot exceed 300 characters');
        }
        if (newDescription.trim() === '') {
            throw new Error('Description is required');
        }
        this.description = newDescription;
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
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }

}