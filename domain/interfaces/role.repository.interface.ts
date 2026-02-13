export interface IRoleRepository {
  getUserRoles(userId: number): Promise<string>;
  hasRole(userId: number, role: string): Promise<boolean>;
  hasAnyRole(userId: number, roles: string[]): Promise<boolean>;
  getRoleFromUserType(userTypeId: number): string;
  createRole(roleName: string): Promise<void>;
  getRoleByName(roleName: string): Promise<string | null>;
}
