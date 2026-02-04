import { SessionData } from "../entities/session/session-data";

export interface ISessionRepository {
  saveSession(userId: number, sessionData: SessionData): Promise<void>;
  getSession(userId: number): Promise<SessionData | null>;
  deleteSession(userId: number): Promise<void>;
  refreshSession(userId: number): Promise<void>;
}
