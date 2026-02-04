import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { LoginDto, LoginResponseDto } from "./login.dto";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { ISessionRepository } from "../../../domain/repositories/session.repository.interface";
import { ITokenRepository } from "../../../domain/repositories/token.repository.interface";
import { IJwtRepository } from "../../../domain/repositories/jwt.repository.interface";
import { SessionData } from "../../../domain/entities/session/session-data";
import { TokenData } from "../../../domain/entities/token/token-data";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
    @Inject("IJwtRepository")
    private readonly jwtRepository: IJwtRepository,
    @Inject("ISessionRepository")
    private readonly sessionRepository: ISessionRepository,
    @Inject("ITokenRepository")
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async save(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtRepository.sign(payload);

    // Salvar sessão no Redis usando SessionRepository
    const sessionData = new SessionData(
      user.id,
      user.email,
      user.role,
      user.name,
      user.phoneNumber,
      user.userTypeId,
      new Date().toISOString(),
    );
    await this.sessionRepository.saveSession(user.id, sessionData);

    // Salvar token para controle de sessão
    const tokenData = new TokenData(user.id, true);
    await this.tokenRepository.saveToken(token, tokenData);

    return new LoginResponseDto(token, {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userTypeId: user.userTypeId,
    });
  }
}
