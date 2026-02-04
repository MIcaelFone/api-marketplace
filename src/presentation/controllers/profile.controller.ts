import { Controller, Get, UseGuards, Request, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { ISessionRepository } from "../../../domain/repositories/session.repository.interface";

@Controller("profile")
export class ProfileController {
  constructor(
    @Inject("ISessionRepository")
    private readonly sessionRepository: ISessionRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const userId = req.user.userId;

    // Buscar dados da sessão no cache (mais rápido que banco)
    const session = await this.sessionRepository.getSession(userId);

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
    await this.sessionRepository.refreshSession(userId);

    return { message: "Session refreshed" };
  }
}
