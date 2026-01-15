import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

// Importe TODAS as entidades TypeORM
import { UserTypeOrmEntity } from "../../../infra/database/typeorm/user/user.typeorm-entity";
import { UserTypeTypeOrmEntity } from "../../../infra/database/typeorm/user/userType.typeorm-entity";
import { AddressTypeOrmEntity } from "../../../infra/database/typeorm/address/address.typeorm-entity";
import { CartTypeOrmEntity } from "../../../infra/database/typeorm/cart/cart.typeorm-entity";
import { CartItemTypeOrmEntity } from "../../../infra/database/typeorm/cart/cart-item.typeorm-entity";
import { CategoryTypeOrmEntity } from "../../../infra/database/typeorm/categories/category.typeorm-entity";
import { OrderTypeOrmEntity } from "../../../infra/database/typeorm/orders/order.typeorm-entity";
import { OrderItemTypeOrmEntity } from "../../../infra/database/typeorm/orders/order-item.typeorm-entity";
import { PaymentsTypeOrmEntity } from "../../../infra/database/typeorm/payments/payments.typeorm-entity";
import { ProductTypeOrmEntity } from "../../../infra/database/typeorm/product/product.typeorm-entity";
import { ProductCategoryTypeOrmEntity } from "../../../infra/database/typeorm/product/product-category.typeorm-entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
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
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
