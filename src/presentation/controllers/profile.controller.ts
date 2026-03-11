import { Controller, Get, UseGuards, Request, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { ISessionRepository } from "../../../domain/interfaces/session.repository.interface";
interface AuthenticatedRequest extends Request {
  user: { userId: string };
}
@Controller("profile")
export class ProfileController {
  constructor(
    @Inject("ISessionRepository")
    private readonly sessionRepository: ISessionRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    const session = await this.sessionRepository.getSession(Number(userId));

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
  async refreshSession(
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    const userId = req.user.userId;
    await this.sessionRepository.refreshSession(Number(userId));
    return { message: "Session refreshed" };
  }
}
