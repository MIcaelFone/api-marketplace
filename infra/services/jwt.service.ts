import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { IJwtRepository } from "../../domain/repositories/jwt.repository.interface";

@Injectable()
export class JwtService implements IJwtRepository {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }
}
