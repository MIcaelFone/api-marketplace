import { Injectable } from "@nestjs/common";
import { SessionService } from "../../services/session.service";

@Injectable()
export class LogoutUseCase {
  constructor(private readonly sessionService: SessionService) {}

  async execute(userId: number, token: string): Promise<{ message: string }> {
    // Remove sessão do usuário
    await this.sessionService.deleteSession(userId);

    // Invalida o token
    await this.sessionService.invalidateToken(token);

    return { message: "Logout successful" };
  }
}
