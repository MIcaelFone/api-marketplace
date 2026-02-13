import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { UserEntity } from "@domain/entities/user/user.entity";
import { UserTypeOrmEntity } from "@infra/database/typeorm/user/user.typeorm-entity";
import { Email } from "@domain/valueObjects/email.vo";
import { Phone } from "@domain/valueObjects/phone.vo";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepo: Repository<UserTypeOrmEntity>,
  ) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    const ormEntity = this.userRepo.create(this.toOrm(userEntity));
    const saved = await this.userRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    return users.map((u) => this.toDomain(u));
  }

  async getUserTypeId(userId: number): Promise<number> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user.userTypeID;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;
    return this.toDomain(user);
  }

  async existByEmail(email: string): Promise<boolean> {
    const count = await this.userRepo.count({ where: { email } });
    return count > 0;
  }

  async delete(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  }

  async update(id: number, userEntity: UserEntity): Promise<UserEntity> {
    const existing = await this.userRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`User with id ${id} not found`);
    }

    existing.name = userEntity.getName();
    existing.email = userEntity.getEmail().getValue();
    existing.password = userEntity.getPassword();
    existing.phoneNumber = userEntity.getPhoneNumber().getValue();
    existing.userTypeID = userEntity.getUserTypeId();
    existing.isactive = userEntity.getIsActive();

    const saved = await this.userRepo.save(existing);
    return this.toDomain(saved);
  }

  private toDomain(orm: UserTypeOrmEntity): UserEntity {
    return UserEntity.restore(
      orm.id,
      orm.name,
      Phone.create(orm.phoneNumber),
      Email.restore(orm.email),
      orm.password,
      orm.userTypeID,
      orm.createdAt,
      orm.updatedAt,
      orm.isactive,
    );
  }

  private toOrm(entity: UserEntity): Partial<UserTypeOrmEntity> {
    return {
      name: entity.getName(),
      email: entity.getEmail().getValue(),
      password: entity.getPassword(),
      phoneNumber: entity.getPhoneNumber().getValue(),
      userTypeID: entity.getUserTypeId(),
      isactive: entity.getIsActive(),
    };
  }
}
