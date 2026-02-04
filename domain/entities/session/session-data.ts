export class SessionData {
  constructor(
    public readonly userId: number,
    public readonly email: string,
    public readonly role: string,
    public readonly name: string,
    public readonly phoneNumber: string,
    public readonly userTypeId: number,
    public readonly loginAt: string,
  ) {}
}
