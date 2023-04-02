import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "src/roles/roles.model";
import { Profile } from "./profile.model";
import { TextBlock } from "src/text_block/text_block.model";
import { UserRoles } from "src/roles/user_roles.model";
import { RolesService } from "src/roles/roles.service";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { ProfileService } from "./profile.service";
@Module({
  controllers: [UsersController],
  providers: [UsersService, ProfileService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, TextBlock, Profile]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
