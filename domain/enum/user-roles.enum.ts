export const UserRoles = {
  BUYER: "buyer",
  SELLER: "seller",
  ADMIN: "admin",
} as const;

export type UserRoleType = (typeof UserRoles)[keyof typeof UserRoles];
