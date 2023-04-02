import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UploadedFile,
  UseInterceptors,
  Param,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateTextBlockDto } from "./dto/create_text_block_dto";
import { TextBlockService } from "./text_block.service";
import { Express } from "express";
import { UpdatedAt } from "sequelize-typescript";
@Controller("blocks")
export class TextBlockController {
  constructor(private textBlockService: TextBlockService) {}
  //сдеать create update delete доступным только админу
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() dto: CreateTextBlockDto, @UploadedFile() image) {
    return this.textBlockService.createTextBlock(dto, image);
  }

  @Get("/:value")
  get(@Param("value") value: string) {
    return this.textBlockService.getTextBlocks(value);
  }

  @Patch("/:value") //через raw json. form-data не работает
  patch(@Body() dto, @Param("value") value: string) {
    return this.textBlockService.updateTextBlock(dto, value);
  }

  @Delete("/:value")
  delete(@Param("value") value: string) {
    return this.textBlockService.deleteTextBlock(value);
  }
}
