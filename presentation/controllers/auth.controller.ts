import { Controller, Post, Body } from "@nestjs/common";
import {
  LoginDto,
  LoginResponseDto,
} from "../../application/use-cases/auth/login.dto";
import { LoginUseCase } from "../../application/use-cases/auth/login.use-case";

@Controller("auth")
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post("login")
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.save(dto);
  }
}
