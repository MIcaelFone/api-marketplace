import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ITokenRepository } from "../../domain/interfaces/token.repository.interface";
import { TokenData } from "../../domain/entities/token/token-data";

@Injectable()
export class TokenService implements ITokenRepository {
  private readonly TOKEN_TTL = 86400000; // 24 horas em milissegundos

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * Salva o token no cache para controle
   */
  async saveToken(token: string, tokenData: TokenData): Promise<void> {
    const key = this.getTokenKey(token);
    await this.cacheManager.set(key, tokenData, this.TOKEN_TTL);
  }

  /**
   * Verifica se o token é válido
   */
  async isTokenValid(token: string): Promise<boolean> {
    const key = this.getTokenKey(token);
    const tokenData = await this.cacheManager.get<TokenData>(key);
    return tokenData?.valid === true;
  }

  /**
   * Invalida um token (para logout forçado)
   */
  async invalidateToken(token: string): Promise<void> {
    const key = this.getTokenKey(token);
    await this.cacheManager.del(key);
  }

  private getTokenKey(token: string): string {
    return `token:${token}`;
  }
}
