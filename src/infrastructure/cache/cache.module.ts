import { Module } from "@nestjs/common";
import { CacheModule as NestCacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        store: redisStore as unknown as string,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        ttl: configService.get("REDIS_TTL"),
        password: configService.get("REDIS_PASSWORD"),
        max: 100,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {}
