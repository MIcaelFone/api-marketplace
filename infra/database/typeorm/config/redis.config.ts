import { CacheModuleOptions } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";
export const getRedisConfig = (
  configService: ConfigService,
): CacheModuleOptions => ({
  store: redisStore as unknown as string,
  host: configService.get("REDIS_HOST"),
  port: configService.get("REDIS_PORT"),
  ttl: configService.get("REDIS_TTL"),
  password: configService.get("REDIS_PASSWORD"),
  max: 100,
});
