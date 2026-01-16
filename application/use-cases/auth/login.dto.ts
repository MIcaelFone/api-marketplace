import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class LoginDto {
  @IsEmail({}, { message: "Invalid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
export class LoginResponseDto {
  acess_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    userTypeId: number;
  };

  constructor(
    token: string,
    user?: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string;
      userTypeId: number;
    }
  ) {
    this.acess_token = token;
    this.user = user;
  }
}
