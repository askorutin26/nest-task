import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { FileBlock } from "./files.model";
@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([FileBlock])],
})
export class FilesModule {}
