export class Email{
    private constructor(
    private readonly email : string,
    private readonly emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    private readonly emailServiceProviders: string[] = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com',
        'aol.com'
    ]
    ){
        this.validate();
    }

    private validate() : void {
        if(!this.email || this.email.trim() === ''){
            throw new Error('Email is required');
        }
        if(!this.emailRegex.test(this.email)){
            throw new Error('Email format is invalid');
        }
        if(!this.emailServiceProviders.some(provider => this.email.endsWith(`@${provider}`))){
            throw new Error('Email service provider is not supported');
        }
        if(this.email.length < 54){
            throw new Error('Email must not exceed 54 characters');
        }
    }

}