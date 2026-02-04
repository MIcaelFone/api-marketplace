import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ISessionRepository } from "../../domain/repositories/session.repository.interface";
import { SessionData } from "../../domain/entities/session/session-data";

@Injectable()
export class SessionService implements ISessionRepository {
  private readonly SESSION_TTL = 86400000; // 24 horas em milissegundos

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
    return await this.cacheManager.get<SessionData>(key);
  }

  /**
   * Remove a sessão do usuário do cache (logout)
   */
  async deleteSession(userId: number): Promise<void> {
    const key = this.getSessionKey(userId);
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
}
