import { CartItemEntity } from './cart-item.entity';
export class CartEntity {
    private constructor(
        private readonly id: number | null,
        private readonly userId: number,
        private itens: CartItemEntity[],
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        this.validate();
    }
    public validate(): void {
        if (!Number.isInteger(this.id) && this.id !== null) {
            throw new Error('ID must be an integer or null');
        }
        if(this.userId <= 0 || !Number.isInteger(this.userId)){
            throw new Error('User ID must be a positive integer');
        }
        if(!Array.isArray(this.itens)){
            throw new Error('Itens must be an array of CartItemEntity');
        }
        if(this.createdAt === null || !(this.createdAt instanceof Date)){
            throw new Error('CreatedAt must be a valid Date');
        }
        if(this.updatedAt !== null && !(this.updatedAt instanceof Date)){
            throw new Error('UpdatedAt must be a valid Date or null');
        }
    }
    static create(userId: number,itens:CartItemEntity[]): CartEntity {
        return new CartEntity(
            null,
            userId,
            itens,
            new Date(),
            new Date()
        );
    }
    static restore(id: number,userId: number,itens:CartItemEntity[], createdAt: Date, updatedAt: Date): CartEntity {
        return new CartEntity(
            id,
            userId,
            itens,
            createdAt,
            updatedAt
        );
    }
    addItem(item: CartItemEntity): void {
        const existingItem = this.itens.find(i => {
            // Verifica por productId para evitar duplicação
            return i.getProductId() === item.getProductId();
        });
        
        if(existingItem){
            // Se já existe, incrementa a quantidade ao invés de adicionar novo
            existingItem.incrementQuantity(item.getQuantity());
        } else {
            this.itens.push(item);
        }
        this.updatedAt = new Date();
    }
    removeItem(itemId: number): void {
        this.itens = this.itens.filter(item => item.getId() !== itemId);
        this.updatedAt = new Date();
    }
    getId(): number | null {
        return this.id;
    }
    getItems(): CartItemEntity[] {
        return this.itens;
    }
    getUserId(): number {
        return this.userId;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date {
        return this.updatedAt;
    }
    getTotalPrice(): number {
        return this.itens.reduce((total, item) => {
            return total + (item.getpriceAtTime() * item.getQuantity());
        }, 0);
    }
    
} 