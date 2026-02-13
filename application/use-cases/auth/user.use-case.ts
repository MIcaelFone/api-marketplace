import { UserDto, UserResponseDto } from "@application/DTO/user.dto";
import { IUserRepository } from "../../../domain/interfaces/user.repository.interface";
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { UserEntity } from "@domain/entities/user/user.entity";
import { Email } from "@domain/valueObjects/email.vo";
import { Phone } from "@domain/valueObjects/phone.vo";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserUseCase {
  constructor(
    @Inject("IUserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async create(dto: UserDto): Promise<UserResponseDto> {
    const emailExists = await this.userRepository.existByEmail(dto.email);
    if (emailExists) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userEntity = UserEntity.create(
      dto.name,
      Email.create(dto.email),
      Phone.create(dto.phoneNumber),
      hashedPassword,
      dto.userTypeId,
    );

    const savedUser = await this.userRepository.create(userEntity);

    return this.toResponseDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.toResponseDto(user));
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, dto: UserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser && existingUser.getId() !== id) {
      throw new ConflictException("Email already in use by another user");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userEntity = UserEntity.create(
      dto.name,
      Email.create(dto.email),
      Phone.create(dto.phoneNumber),
      hashedPassword,
      dto.userTypeId,
    );

    const updatedUser = await this.userRepository.update(id, userEntity);

    return this.toResponseDto(updatedUser);
  }

  private toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.getId()!,
      nome: user.getName(),
      email: user.getEmail().getValue(),
      phoneNumber: user.getPhoneNumber().getValue(),
      userTypeId: user.getUserTypeId(),
    };
  }
}
