import { UserEntity } from "../entities/user/user.entity";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  getUserTypeId(userId: number): Promise<number>;
  findByEmail(email: string): Promise<UserEntity | null>;
  existByEmail(email: string): Promise<boolean>;
  create(user: UserEntity): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  update(id: number, user: UserEntity): Promise<UserEntity>;
}
