import { Email } from '@domain/valueObjects/email.vo';
import { Phone } from '@domain/valueObjects/phone.vo';
import * as bcrypt from 'bcrypt';
export class UserEntity {
  private constructor(
    private readonly id: number | null,
    private name: string,
    private email: Email,
    private passwordHash: string,
    private phoneNumber: Phone,
    private readonly userTypeId: number,
    private readonly createdAt: Date,
    private updatedAt: Date | null,
    private isActive: boolean,
  ) {
    this.validate();
  }

  public validate(): void {
    if (this.id !== null && !Number.isInteger(this.id)) {
      throw new Error('ID must be an integer or null');
    }
    if (!this.name || this.name.trim() === '') {
      throw new Error('Name is required');
    }
    if (this.name.length < 3) {
      throw new Error('Name must be at least 3 characters long');
    }
    if (!this.email || this.email.getValue() === '') {
      throw new Error('Email is required');
    }
    if (this.email.getValue().length > 254) {
      throw new Error('Email must not exceed 254 characters');
    }
    if (!this.passwordHash || this.passwordHash.trim() === '') {
      throw new Error('Password is required');
    }
    if (!Number.isInteger(this.userTypeId) || this.userTypeId <= 0) {
      throw new Error('User type ID must be a positive integer');
    }
    if (!this.phoneNumber.getValue()) {
      throw new Error('Phone number is required');
    }
    if (!this.phoneNumber.getNumber()) {
      throw new Error('Phone number is invalid');
    }
    if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
      throw new Error('Created at must be a valid Date');
    }
    if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
      throw new Error('Updated at must be a valid Date');
    }
  }
  static create(
    name: string,
    email: Email,
    phoneNumber: Phone,
    passwordHash: string,
    userTypeId: number,
  ): UserEntity {
    return new UserEntity(
      null,
      name,
      email,
      passwordHash,
      phoneNumber,
      userTypeId,
      new Date(),
      new Date(),
      true,
    );
  }
  static restore(
    id: number,
    name: string,
    phoneNumber: Phone,
    email: Email,
    passwordHash: string,
    userTypeId: number,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean,
  ): UserEntity {
    return new UserEntity(
      id,
      name,
      email,
      passwordHash,
      phoneNumber,
      userTypeId,
      createdAt,
      updatedAt,
      isActive,
    );
  }
  updatePassword(newPassword: string): void {
    if (!newPassword || newPassword.trim() === '') {
      throw new Error('Password is required');
    }
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    this.passwordHash = bcrypt.hashSync(newPassword, 10);
    this.updatedAt = new Date();
  }
  updateEmail(newEmail: Email): void {
    if (!newEmail || newEmail.getValue() === '') {
      throw new Error('Email is required');
    }
    if (this.email.equals(newEmail)) {
      throw new Error('New email must be different from the current email');
    }
    if (newEmail.getValue().length > 254) {
      throw new Error('Email must not exceed 254 characters');
    }
    this.email = newEmail;
    this.updatedAt = new Date();
  }
  activate(): void {
    if (this.isActive) {
      throw new Error('User is already active');
    }
    this.isActive = true;
    this.updatedAt = new Date();
  }
  desactivate(): void {
    if (!this.isActive) {
      throw new Error('User is already inactive');
    }
    this.isActive = false;
    this.updatedAt = new Date();
  }
  getId(): number | null {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): Email {
    return this.email;
  }
  getUserTypeId(): number {
    return this.userTypeId;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
  getIsActive(): boolean {
    return this.isActive;
  }
}
