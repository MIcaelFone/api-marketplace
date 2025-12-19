export class Email{
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    private static readonly MAX_LENGTH = 254; 
    private static readonly emailServiceProviders = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com',
        'icloud.com'
    ]
    private static allowedcostumDomains : boolean = false;
    private constructor(
      private readonly email : string,
    ){
        this.validate();
    }

    private validate() : void {
        if(!this.email || this.email.trim() === ''){
            throw new Error('Email is required');
        }
        if(!Email.EMAIL_REGEX.test(this.email)){
            throw new Error('Email format is invalid');
        }
        if(this.email.length > Email.MAX_LENGTH){
            throw new Error('Email must not exceed 254 characters');
        }
        if(!Email.allowedcostumDomains){
            const domain = this.getDomain();
            if(!Email.emailServiceProviders.includes(domain)){
                throw new Error(`Email domain ${domain} is not allowed`);
            }
        }
    }
    static create(email:string) : Email {
        return new Email(email);
    }
    static restore(email:string) : Email {
        return new Email(email);
    }
    static setAllowedCostumDomains(allowed: boolean) : void {
        this.allowedcostumDomains = allowed;
    }
    static getAllAllowedCostumDomains() : string[] {
        return Email.emailServiceProviders;
    }
    static addEmailServiceProvider(provider: string) : void {
        if(this.emailServiceProviders.includes(provider)){
            throw new Error('Email service provider already exists');
        }
        this.emailServiceProviders.push(provider);
    }
    getValue() : string {
        return this.email;
    }
    getDomain() : string {
        return this.email.split('@')[1];
    }
    equals(other: Email) : boolean {
        return this.email === other.getValue();
    }
       

}