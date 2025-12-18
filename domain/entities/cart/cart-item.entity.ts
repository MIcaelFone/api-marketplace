export class CartItemEntity {
    constructor(
        private readonly id: number | null,
        private readonly productId: number,
        private readonly userId: number,
        private quantity: number,
        private readonly priceAtTime: number,
        private readonly createdAt: Date,
        private updatedAt: Date,
    )
    {
        this.validate();
    }
    static create(productId:number, userId:number, quantity:number, priceAtTime:number,createdAt:Date): CartItemEntity {
        return new CartItemEntity(
            null,
            productId, 
            userId, 
            quantity, 
            priceAtTime, 
            new Date(),
            new Date()
        );
    }
    static restore(id:number,productId:number, userId:number, quantity:number, priceAtTime:number,createdAt:Date,updatedAt:Date): CartItemEntity{
        return new CartItemEntity
        (
            id,
            productId, 
            userId,
            quantity,
            priceAtTime,
            createdAt,
            updatedAt
        );        
    }

    public validate() :void {
        if(!Number.isInteger(this.id) && this.id !== null){
            throw new Error("ID must be an integer or null.");
        }
        if(this.quantity <= 0){
            throw new Error("Quantity must be greater than zero.");
        }
        if(this.priceAtTime < 0){
            throw new Error("Price at time cannot be negative.");
        }
        if(!Number.isInteger(this.quantity)){
            throw new Error("Quantity must be an integer.");
        }
        if(!Number.isInteger(this.productId) || this.productId <= 0){
            throw new Error("Product ID must be a positive integer.");
        }
    }
    incrementQuantity(amount: number): void {
        if (amount <= 0 || !Number.isInteger(amount)) {
            throw new Error("Increment amount must be a positive integer.");
        }
        this.quantity += amount;
        this.updatedAt = new Date();
    }    
    updateQuantity(newQuantity: number): void {
        if (newQuantity <= 0 || !Number.isInteger(newQuantity)) {
            throw new Error("New quantity must be a positive integer.");
        }
        this.quantity = newQuantity;
        this.updatedAt = new Date();
    }
    getId(): number | null {
        return this.id;
    }
    getQuantity(): number {
        return this.quantity;
    }
    getpriceAtTime() : number{
        return this.priceAtTime;
    } 
    getCreatedAt(): Date  | null {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }
   
}