import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt-auth.guard";
import { Roles } from "../../infrastructure/auth/roles.decorator";
import { RolesGuard } from "../../infrastructure/auth/roles.guard";
import { UserRoles } from "../../../domain/enum/user-roles.enum";

@Controller("orders")
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  // Buyers podem criar pedidos
  @Post()
  @Roles(UserRoles.BUYER)
  createOrder(@Body() createOrderDto: unknown) {
    return {
      message: "Pedido criado com sucesso",
      data: createOrderDto,
    };
  }

  // Buyers podem ver seus próprios pedidos
  @Get("my-orders")
  @Roles(UserRoles.BUYER)
  getMyOrders() {
    return {
      message: "Meus pedidos",
      data: [],
    };
  }

  // Sellers podem ver pedidos dos seus produtos
  @Get("sales")
  @Roles(UserRoles.SELLER)
  getMySales() {
    return {
      message: "Minhas vendas",
      data: [],
    };
  }

  // Admins podem ver todos os pedidos
  @Get()
  @Roles(UserRoles.ADMIN)
  getAllOrders() {
    return {
      message: "Todos os pedidos",
      data: [],
    };
  }

  // Admins podem ver detalhes de qualquer pedido
  @Get(":id")
  @Roles(UserRoles.ADMIN)
  getOrder(@Param("id") id: string) {
    return {
      message: `Detalhes do pedido ${id}`,
      data: {},
    };
  }
}
