export class OrderItemEntity {
    constructor(
        private readonly id: number |  null,
        private readonly orderId: number ,
        private readonly productId: number,
        private readonly quantity: number,
        private readonly price: number,
        private readonly productSkuAtTime: string,
        private readonly productNameAtTime: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date | null,
    )
    {
        this.validate();
    }
    private validate():void {
        if(this.id !== null && !Number.isInteger(this.id)){
            throw new Error('ID must be an integer or null');
        } 
        if(!Number.isInteger(this.productId) || this.productId <= 0){
            throw new Error('Product ID must be a positive integer');
        }
        if(!Number.isInteger(this.orderId) || this.orderId <= 0){
            throw new Error('Order ID must be a positive integer');
        }
        if(this.quantity <= 0){
            throw new Error('Quantity must be greater than zero');
        }
        if(this.price < 0){
            throw new Error('Price must be greater than or equal to zero');
        }
        if(!this.productSkuAtTime || this.productSkuAtTime.trim() === ''){
            throw new Error('Product SKU at time is required');
        }
        if(!this.productNameAtTime || this.productNameAtTime.trim() === ''){
            throw new Error('Product name at time is required');
        }
    } 
    static create(userId:number,productId:number,quantity:number,price:number,productNameAtTime:string,productSkuAtTime:string): OrderItemEntity {
        return new OrderItemEntity(
            null,
            userId,
            productId,
            quantity,
            price,
            productSkuAtTime,
            productNameAtTime,
            new Date(),
            null
        );
    }
    static restore(id:number,userId:number,productId:number,quantity:number,price:number,productNameAtTime:string,productSkuAtTime:string,createdAt:Date,updatedAt:Date): OrderItemEntity {
        return new OrderItemEntity(
            id,
            userId,
            productId,
            quantity,
            price,
            productSkuAtTime,
            productNameAtTime,
            createdAt,
            updatedAt
        );
    }

    getOrderId(): number {
        return this.orderId;
    }
    getProductSkuAtTime(): string {
        return this.productSkuAtTime;
    }
    getProductNameAtTime(): string {
        return this.productNameAtTime;
    }
    getQuantity():number {
        return this.quantity;
    }
    getPrice() : number{
        return this.price;
    }
    getProductId(): number {
        return this.productId;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }
    
}