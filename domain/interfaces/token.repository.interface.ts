import { TokenData } from "../entities/token/token-data";

export interface ITokenRepository {
  saveToken(token: string, tokenData: TokenData): Promise<void>;
  isTokenValid(token: string): Promise<boolean>;
  invalidateToken(token: string): Promise<void>;
}
