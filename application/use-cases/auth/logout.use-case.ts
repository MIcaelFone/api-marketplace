import { Injectable, Inject } from "@nestjs/common";
import { ISessionRepository } from "../../../domain/interfaces/session.repository.interface";
import { ITokenRepository } from "../../../domain/interfaces/token.repository.interface";

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject("ISessionRepository")
    private readonly sessionRepository: ISessionRepository,
    @Inject("ITokenRepository")
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(userId: number, token: string): Promise<{ message: string }> {
   
    await this.sessionRepository.deleteSession(userId);

     
    await this.tokenRepository.invalidateToken(token);

    return { message: "Logout successful" };
  }
}
