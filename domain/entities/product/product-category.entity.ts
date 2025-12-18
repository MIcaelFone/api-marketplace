export class productCategoryEntity {
    constructor(
        private readonly id: number,
        private readonly productId: number,
        private readonly categoryId: number,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
    ) {
        this.validate();
    }
    public validate() : void {
        if (this.id <= 0) {
            throw new Error('ID must be a positive number');
        }
        if (!this.productId) {
            throw new Error('Product ID is required');
        }
        if (!this.categoryId) {
            throw new Error('Category ID is required');
        }
    }
    static create(id: number, productId: number, categoryId: number, createdAt: Date, updatedAt: Date): productCategoryEntity {
        return new productCategoryEntity(
            id,
            productId,
            categoryId,
            new Date(),
            new Date()
        );
    }
    static restore(id: number, productId: number, categoryId: number, createdAt: Date, updatedAt: Date): productCategoryEntity {
        return new productCategoryEntity(
            id,
            productId,
            categoryId,
            createdAt,
            updatedAt
        );
    }
    getId(): number {
        return this.id;
    }
    getProductId(): number {
        return this.productId;
    }
    getCategoryId(): number {
        return this.categoryId;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date {
        return this.updatedAt;
    }

}