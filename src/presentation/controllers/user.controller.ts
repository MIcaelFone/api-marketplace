import { UserDto } from "@application/DTO/user.dto";
import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UserUseCase } from "../../../application/use-cases/auth/user.use-case";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { RolesGuard } from "../../infrastructure/auth/roles.guard";
import { Roles } from "../../infrastructure/auth/roles.decorator";
import { UserRoles } from "../../../domain/enum/user-roles.enum";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async getAllUsers() {
    const users = await this.userUseCase.findAll();
    return {
      message:
        users.length > 0 ? "Lista de usuários" : "Nenhum usuário encontrado",
      data: users,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRoles.ADMIN)
  async createUser(@Body() createUserDto: UserDto) {
    const createdUser = await this.userUseCase.create(createUserDto);
    return {
      message: "Usuário criado com sucesso",
      data: createdUser,
    };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async updateUser(@Param("id") id: string, @Body() updateUserDto: UserDto) {
    const updatedUser = await this.userUseCase.update(
      Number(id),
      updateUserDto,
    );
    return {
      message: "Usuário atualizado com sucesso",
      data: updatedUser,
    };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async deleteUser(@Param("id") id: string): Promise<{ message: string }> {
    await this.userUseCase.delete(Number(id));
    return {
      message: "Usuário deletado com sucesso",
    };
  }
}
