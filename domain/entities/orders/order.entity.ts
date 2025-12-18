import { OrderStatusEnum } from "domain/enum/order-status.enum";
export class OrderEntity {
    constructor (
        private readonly id: number | null,
        private readonly userId: number,
        private readonly addressId: number,
        private readonly totalAmount: number,
        private orderStatus: string,
        private readonly createdAt: Date,
        private updatedAt: Date | null
    ) 
    {
        this.validate();
    }
    public validate(): void {
        if(!Number.isInteger(this.id) && this.id === null){
            throw new Error('ID must be an integer and not null');
        }   
        if(!Number.isInteger(this.userId) || this.userId <= 0){
            throw new Error('User ID must be a positive integer');
        }
        if(!Number.isInteger(this.addressId) || this.addressId <= 0){
            throw new Error('Address ID must be a positive integer');
        }
        if(this.totalAmount < 0){
            throw new Error('Total amount must be greater than or equal to zero');
        }
        if(!Object.values(OrderStatusEnum).includes(this.orderStatus as keyof typeof OrderStatusEnum)){
            throw new Error('Invalid order status');
        }
        if(!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())){
            throw new Error('Created at must be a valid Date');
        }
        if(!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())){
            throw new Error('Updated at must be a valid Date');
        }   
    }            
    static create(userId:number,addressId:number,totalAmount:number) : OrderEntity {
        return new OrderEntity
        (
            null,
            userId,
            addressId,
            totalAmount,
            OrderStatusEnum.PENDING,
            new Date(),
            null
        )
    }
    static restore(id:number,userId:number,addressId:number,totalAmount:number,orderStatus:string,createdAt:Date,updatedAt:Date) : OrderEntity 
    {
        return new OrderEntity
        (
           id,
           userId,
           addressId,
           totalAmount,
           orderStatus,
           createdAt,
           updatedAt
        )
    }
    processOrder(): void {
        if(this.orderStatus !== OrderStatusEnum.PENDING){
            throw new Error('Only pending orders can be processed');
        }
        this.orderStatus = OrderStatusEnum.PROCESSING;
        this.updatedAt = new Date();
    }   
    deliverOrder(): void {
        if(this.orderStatus === OrderStatusEnum.DELIVERED){
            throw new Error('Order is already delivered');
        }
        else if(this.orderStatus !== OrderStatusEnum.SHIPPED){
            throw new Error('Only shipped orders can be marked as delivered');
        }
        this.orderStatus = OrderStatusEnum.DELIVERED;
        this.updatedAt = new Date();
    }
    cancelOrder(): void {
        if(this.orderStatus === OrderStatusEnum.DELIVERED){
            throw new Error('Delivered orders cannot be cancelled');
        }
        this.orderStatus = OrderStatusEnum.CANCELLED;
        this.updatedAt = new Date();
    }
    
    getId(): number | null {
        return this.id;
    }
    getTotalAmount(): number {
        return this.totalAmount;
    }
    getOrderStatus():string {
        return this.orderStatus;
    }
    getUserId(): number {
        return this.userId;
    }
    getAddressId(): number {
        return this.addressId;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }
      
}