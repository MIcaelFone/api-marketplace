import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

export interface SessionData {
  userId: number;
  email: string;
  role: string;
  name: string;
  phoneNumber: string;
  userTypeId: number;
  loginAt: string;
}

export interface TokenData {
  userId: number;
  valid: boolean;
}

@Injectable()
export class SessionService {
  private readonly SESSION_TTL = 86400000; // 24 horas em milissegundos
  private readonly TOKEN_TTL = 86400000; // 24 horas em milissegundos

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * Salva a sessão do usuário no cache
   */
  async saveSession(userId: number, sessionData: SessionData): Promise<void> {
    const key = this.getSessionKey(userId);
    await this.cacheManager.set(key, sessionData, this.SESSION_TTL);
  }

  /**
   * Recupera a sessão do usuário do cache
   */
  async getSession(userId: number): Promise<SessionData | null> {
    const key = this.getSessionKey(userId);
    const session = await this.cacheManager.get<SessionData>(key);
    return session || null;
  }

  /**
   * Remove a sessão do usuário do cache (logout)
   */
  async deleteSession(userId: number): Promise<void> {
    const key = this.getSessionKey(userId);
    await this.cacheManager.del(key);
  }

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

  /**
   * Atualiza o TTL da sessão (útil para "manter conectado")
   */
  async refreshSession(userId: number): Promise<void> {
    const sessionData = await this.getSession(userId);
    if (sessionData) {
      await this.saveSession(userId, sessionData);
    }
  }

  private getSessionKey(userId: number): string {
    return `session:${userId}`;
  }

  private getTokenKey(token: string): string {
    return `token:${token}`;
  }
}
