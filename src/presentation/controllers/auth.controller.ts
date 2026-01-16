import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import {
  LoginDto,
  LoginResponseDto,
} from "../../../application/use-cases/auth/login.dto";
import { LoginUseCase } from "../../../application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "../../../application/use-cases/auth/logout.use-case";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase
  ) {}

  @Post("login")
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.save(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    return this.logoutUseCase.execute(req.user.userId, token);
  }
}
