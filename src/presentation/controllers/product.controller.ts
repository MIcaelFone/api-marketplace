import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { Roles } from "../../infrastructure/auth/roles.decorator";
import { RolesGuard } from "../../infrastructure/auth/roles.guard";
import { UserRoles } from "../../../domain/enum/user-roles.enum";

@Controller("products")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  @UseGuards(JwtAuthGuard)
  @Get()
  listProducts() {
    return {
      message: "Lista de produtos",
      data: [],
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getProduct(@Param("id") id: string) {
    return {
      message: `Detalhes do produto ${id}`,
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(UserRoles.SELLER, UserRoles.ADMIN)
  createProduct(@Body() createProductDto: unknown) {
    return {
      message: "Produto criado com sucesso",
      data: createProductDto,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  @Roles(UserRoles.SELLER, UserRoles.ADMIN)
  updateProduct(@Param("id") id: string, @Body() updateProductDto: unknown) {
    return {
      message: `Produto ${id} atualizado com sucesso`,
      data: updateProductDto,
    };
  }

  @Delete(":id")
  @Roles(UserRoles.ADMIN)
  deleteProduct(@Param("id") id: string) {
    return {
      message: `Produto ${id} deletado com sucesso`,
    };
  }
}
