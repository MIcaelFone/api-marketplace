import { Injectable, Inject } from "@nestjs/common";
import { IRoleRepository } from "../../domain/interfaces/role.repository.interface";
import { UserRoles } from "../../domain/enum/user-roles.enum";
import { IUserRepository } from "../../domain/interfaces/user.repository.interface";

@Injectable()
export class RoleService implements IRoleRepository {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  private readonly userTypeToRoleMap: Map<number, string> = new Map([
    [1, UserRoles.BUYER], // userTypeId 1 = buyer
    [2, UserRoles.SELLER], // userTypeId 2 = seller
    [3, UserRoles.ADMIN], // userTypeId 3 = admin
  ]);

  async getUserRoles(userId: number): Promise<string> {
    const rules = await this.userRepository.getUserTypeId(userId);
    const role = this.getRoleFromUserType(rules);
    return role;
  }

  async hasRole(userId: number, role: string): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.includes(role);
  }

  async hasAnyRole(userId: number, roles: string[]): Promise<boolean> {
    const userRoles = await this.getUserRoles(userId);
    return roles.some((role) => userRoles.includes(role));
  }

  // Método auxiliar para mapear userTypeId para role
  getRoleFromUserType(userTypeId: number): string {
    return this.userTypeToRoleMap.get(userTypeId) || UserRoles.BUYER;
  }

  // Métodos da interface IRoleRepository que ainda não estão implementados
  async createRole(roleName: string): Promise<void> {
    const roleExists = Array.from(this.userTypeToRoleMap.values()).includes(
      roleName,
    );
    if (roleExists) {
      throw new Error("Role already exists");
    } else if (!roleExists) {
      this.createRole(roleName); // Gera um novo userTypeId
    }
    if (!roleExists) {
      throw new Error("Method not implemented - createRole");
    }
  }

  async getRoleByName(roleName: string): Promise<string | null> {
    for (const [, role] of this.userTypeToRoleMap) {
      if (role === roleName) {
        return roleName;
      }
    }
    return null;
  }
}
