import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { Role } from "./roles/roles.model";
import { TextBlock } from "./text_block/text_block.model";
import { UserRoles } from "./roles/user_roles.model";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./text_block/text_block.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "nest_task",
      models: [User, Role, UserRoles, TextBlock],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
