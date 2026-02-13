import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../../../domain/enum/user-roles.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: (typeof UserRoles)[keyof typeof UserRoles][]) =>
  SetMetadata(ROLES_KEY, roles);
