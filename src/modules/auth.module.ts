import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoginUseCase } from "../../application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "../../application/use-cases/auth/logout.use-case";
import { AuthController } from "../presentation/controllers/auth.controller";
import { JwtStrategy } from "../infrastructure/auth/jwt.strategy";
import { JwtAuthGuard } from "../infrastructure/auth/jwt-auth.guard";
import { SessionService } from "../../application/services/session.service";
import { UserModule } from "./user.module";

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
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    JwtStrategy,
    JwtAuthGuard,
    SessionService,
  ],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
