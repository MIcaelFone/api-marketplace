import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { CacheModule } from "./infrastructure/cache/cache.module";
import { AuthModule } from "./modules/auth.module";

@Module({
  imports: [
    // ConfigModule - Carrega .env (SEMPRE PRIMEIRO)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Módulos de Infraestrutura
    DatabaseModule,
    CacheModule,

    // Módulos de Negócio
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
