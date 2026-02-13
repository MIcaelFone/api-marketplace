import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoginUseCase } from "../../application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "../../application/use-cases/auth/logout.use-case";
import { AuthController } from "../presentation/controllers/auth.controller";
import { ProfileController } from "../presentation/controllers/profile.controller";
import { JwtStrategy } from "../infrastructure/auth/jwt.strategy";
import { JwtAuthGuard } from "../infrastructure/auth/jwt-auth.guard";
import { RolesGuard } from "../infrastructure/auth/roles.guard";
import { SessionService } from "../../infra/services/session.service";
import { TokenService } from "../../infra/services/token.service";
import { JwtService as CustomJwtService } from "../../infra/services/jwt.service";
import { RoleService } from "../../infra/services/role.service";
import { UserModule } from "../user.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET") || "your-secret-key",
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRATION") || "1d",
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: "ISessionRepository",
      useClass: SessionService,
    },
    {
      provide: "ITokenRepository",
      useClass: TokenService,
    },
    {
      provide: "IJwtRepository",
      useClass: CustomJwtService,
    },
    {
      provide: "IRoleRepository",
      useClass: RoleService,
    },
  ],
  exports: [JwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
