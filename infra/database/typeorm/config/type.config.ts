import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

// Importe TODAS as entidades
import { UserTypeOrmEntity } from "../user/user.typeorm-entity";
import { UserTypeTypeOrmEntity } from "../user/userType.typeorm-entity";
import { AddressTypeOrmEntity } from "../address/address.typeorm-entity";
import { CartTypeOrmEntity } from "../cart/cart.typeorm-entity";
import { CartItemTypeOrmEntity } from "../cart/cart-item.typeorm-entity";
import { CategoryTypeOrmEntity } from "../categories/category.typeorm-entity";
import { OrderTypeOrmEntity } from "../orders/order.typeorm-entity";
import { OrderItemTypeOrmEntity } from "../orders/order-item.typeorm-entity";
import { PaymentsTypeOrmEntity } from "../payments/payments.typeorm-entity";
import { ProductTypeOrmEntity } from "../product/product.typeorm-entity";
import { ProductCategoryTypeOrmEntity } from "../product/product-category.typeorm-entity";

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log("🔍 TypeORM Config:", {
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    database: configService.get<string>("DB_DATABASE"),
    synchronize: true,
  });

  return {
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_DATABASE"),

    entities: [
      UserTypeOrmEntity,
      UserTypeTypeOrmEntity,
      AddressTypeOrmEntity,
      CartTypeOrmEntity,
      CartItemTypeOrmEntity,
      CategoryTypeOrmEntity,
      OrderTypeOrmEntity,
      OrderItemTypeOrmEntity,
      PaymentsTypeOrmEntity,
      ProductTypeOrmEntity,
      ProductCategoryTypeOrmEntity,
    ],

    synchronize: true,
    logging: true,

    ssl:
      configService.get<string>("DB_SSL") === "true"
        ? { rejectUnauthorized: false }
        : false,
  };
};
