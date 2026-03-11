import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
export class UserDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name: string;
  @IsEmail({}, { message: "Invalid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
  @IsString()
  @IsNotEmpty({ message: "Phone number must be valid Brazilian number" })
  phoneNumber: string;
  @IsInt()
  @IsNotEmpty({ message: "User type ID is required" })
  userTypeId: number;
}
export class UserResponseDto {
  id: number;
  nome: string;
  email: string;
  phoneNumber: string;
  userTypeId: number;
}
