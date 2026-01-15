import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { SessionService } from "../../../application/services/session.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const userId = req.user.userId;

    // Buscar dados da sessão no cache (mais rápido que banco)
    const session = await this.sessionService.getSession(userId);

    if (!session) {
      return { message: "Session expired", user: req.user };
    }

    return {
      message: "Profile retrieved from cache",
      session,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("refresh")
  async refreshSession(@Request() req) {
    const userId = req.user.userId;

    // Atualiza o TTL da sessão (mantém usuário conectado)
    await this.sessionService.refreshSession(userId);

    return { message: "Session refreshed" };
  }
}
