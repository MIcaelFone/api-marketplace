import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { LoginDto, LoginResponseDto } from "../../DTO/login.dto";
import { IUserRepository } from "../../../domain/interfaces/user.repository.interface";
import { ISessionRepository } from "../../../domain/interfaces/session.repository.interface";
import { ITokenRepository } from "../../../domain/interfaces/token.repository.interface";
import { IJwtRepository } from "../../../domain/interfaces/jwt.repository.interface";
import { IRoleRepository } from "../../../domain/interfaces/role.repository.interface";
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
    @Inject("IRoleRepository")
    private readonly roleRepository: IRoleRepository,
  ) {}

  async save(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.getPassword(),
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

 
    const role = this.roleRepository.getRoleFromUserType(user.getUserTypeId());

    const userId = user.getId();
    if (!userId) {
      throw new UnauthorizedException("Invalid user ID");
    }

    const payload = {
      sub: userId,
      email: user.getEmail().getValue(),
      role: role,
    };
    const token = this.jwtRepository.sign(payload);

     
    const sessionData = new SessionData(
      userId,
      user.getEmail().getValue(),  
      role,
      user.getName(),
      user.getPhoneNumber().getValue(),  
      user.getUserTypeId(),
      new Date().toISOString(),
    );
    await this.sessionRepository.saveSession(userId, sessionData);
    const tokenData = new TokenData(userId, true);
    await this.tokenRepository.saveToken(token, tokenData);

    return new LoginResponseDto(token, {
      id: userId,
      name: user.getName(),
      email: user.getEmail().getValue(),
      phoneNumber: user.getPhoneNumber().getValue(),
      userTypeId: user.getUserTypeId(),
    });
  }
}
