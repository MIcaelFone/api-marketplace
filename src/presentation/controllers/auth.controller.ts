import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { LoginDto, LoginResponseDto } from "../../../application/DTO/login.dto";
import { LoginUseCase } from "../../../application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "../../../application/use-cases/auth/logout.use-case";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";

interface AuthenticatedRequest extends Request {
  user: { userId: string };
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post("login")
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.save(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    const token =req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
    return this.logoutUseCase.execute(Number(req.user.userId), token);
  }
}
