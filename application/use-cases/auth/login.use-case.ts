import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { LoginDto, LoginResponseDto } from "./login.dto";
import { SessionService } from "../../services/session.service";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: any,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService
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
    const token = this.jwtService.sign(payload);

    // Salvar sessão no Redis usando SessionService
    await this.sessionService.saveSession(user.id, {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      phoneNumber: user.phoneNumber,
      userTypeId: user.userTypeId,
      loginAt: new Date().toISOString(),
    });

    // Salvar token para controle de sessão
    await this.sessionService.saveToken(token, {
      userId: user.id,
      valid: true,
    });

    return new LoginResponseDto(token, {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userTypeId: user.userTypeId,
    });
  }
}
