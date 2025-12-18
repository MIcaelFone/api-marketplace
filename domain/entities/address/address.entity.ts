export class AddressEntity {
    private constructor(
        private readonly id: number | null,
        private readonly userId: number,
        private street: string,
        private city: string,
        private state: string,
        private zipCode: string,
        private country: string,
        private readonly createdAt: Date,
        private updatedAt: Date,
    ) {
        this.validate();
    }
    public validate(): void {
        if (this.id !== null && !Number.isInteger(this.id)) {
            throw new Error('ID must be an integer or null');
        }
        if (!Number.isInteger(this.userId) || this.userId <= 0) {
            throw new Error('User ID must be a positive integer');
        }
        if (!this.street || this.street.trim() === '') {
            throw new Error('Street is required');
        }
        if(this.street.length < 5){
            throw new Error('Street must be at least 5 characters long');
        }
        if (!this.city || this.city.trim() === '') {
            throw new Error('City is required');
        }
        if(this.city.length < 2){
            throw new Error('City must be at least 2 characters long');
        }
        if (!this.state || this.state.trim() === '') {
            throw new Error('State is required');
        }
        if(this.state.length < 2){
            throw new Error('State must be at least 2 characters long');
        }
        if (!this.zipCode || this.zipCode.trim() === '') {
            throw new Error('Zip code is required');
        }
        if(this.zipCode.length < 8){
            throw new Error('Zip code must be at least 8 characters long');
        }
        if (!this.country || this.country.trim() === '') {
            throw new Error('Country is required');
        }
        if(this.country.length < 2){
            throw new Error('Country must be at least 2 characters long');
        }
        if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
            throw new Error('Created at must be a valid Date');
        }
        if (this.updatedAt !== null && (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime()))) {
            throw new Error('Updated at must be a valid Date or null');
        }   
    }
    static create(userId: number, street: string, city: string, state: string, zipCode: string, country: string): AddressEntity {
        return new AddressEntity(
            null,
            userId,
            street,
            city,
            state,
            zipCode,
            country,
            new Date(),
            new Date()
        );
    }
    static restore(id: number, userId: number, street: string, city: string, state: string, zipCode: string, country: string, createdAt: Date, updatedAt: Date): AddressEntity {
        return new AddressEntity(
            id,
            userId,
            street,
            city,
            state,
            zipCode,
            country,
            createdAt,
            updatedAt
        );
    }
    updateStreet(newStreet: string): void {
        if (!newStreet || newStreet.trim() === '') {
            throw new Error('Street is required');
        }
        if(newStreet.length < 5){
            throw new Error('Street must be at least 5 characters long');
        }
        this.street = newStreet;
        this.updatedAt = new Date();
    }
    updateCity(newCity: string): void {
        if (!newCity || newCity.trim() === '') {
            throw new Error('City is required');
        }
        if(newCity.length < 2){
            throw new Error('City must be at least 2 characters long');
        }
        this.city = newCity;
        this.updatedAt = new Date();
    }
    updateState(newState: string): void {
        if (!newState || newState.trim() === '') {
            throw new Error('State is required');
        }   
        if(newState.length < 2){
            throw new Error('State must be at least 2 characters long');
        }
        this.state = newState;
        this.updatedAt = new Date();
    }
    updateZipCode(newZipCode: string): void {
        if (!newZipCode || newZipCode.trim() === '') {
            throw new Error('Zip code is required');
        }
        if(newZipCode.length < 8){
            throw new Error('Zip code must be at least 8 characters long');
        }
        this.zipCode = newZipCode;
        this.updatedAt = new Date();
    }
    getId(): number | null {
        return this.id;
    }
    getUserId(): number {
        return this.userId;
    }
    getStreet(): string {
        return this.street;
    }
    getCity(): string {
        return this.city;
    }
    getState(): string {
        return this.state;
    }
    getZipCode(): string {
        return this.zipCode;
    }
    getCountry(): string {
        return this.country;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }
    getUpdatedAt(): Date | null {
        return this.updatedAt;
    }    
}     
