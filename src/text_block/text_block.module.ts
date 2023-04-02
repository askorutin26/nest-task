import { Module } from "@nestjs/common";
import { TextBlockController } from "./text_block.controller";
import { TextBlockService } from "./text_block.service";
import { TextBlock } from "./text_block.model";
import { User } from "../users/users.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/files/files.module";
@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],
  imports: [SequelizeModule.forFeature([User, TextBlock]), FilesModule],
})
export class PostsModule {}
