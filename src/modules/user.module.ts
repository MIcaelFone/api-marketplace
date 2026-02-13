import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTypeOrmEntity } from "../../infra/database/typeorm/user/user.typeorm-entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserUseCase } from "../../application/use-cases/auth/user.use-case";
import { UserController } from "../presentation/controllers/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  providers: [
    UserUseCase,
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: ["IUserRepository"],
})
export class UserModule {}
