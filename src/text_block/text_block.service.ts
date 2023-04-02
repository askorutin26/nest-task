import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreateTextBlockDto } from "./dto/create_text_block_dto";
import { TextBlock } from "./text_block.model";
@Injectable()
export class TextBlockService {
  constructor(
    @InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
    private fileService: FilesService
  ) {}

  async createTextBlock(dto: CreateTextBlockDto, image: any) {
    const filename = await this.fileService.createFile(image);
    const post = await this.textBlockRepository.create({
      ...dto,
      image: filename,
    });
    return post;
  }

  async getTextBlocks(group: string) {
    const blocks = await this.textBlockRepository.findAll({
      include: { all: true },
    });
    return blocks.filter((elem) => elem.group_name === group);
  }

  async updateTextBlock(dto: CreateTextBlockDto, title: string) {
    await this.textBlockRepository.update(
      { ...dto },
      {
        where: {
          unique_title: title,
        },
      }
    );

    return {
      updated: true,
    };
  }

  async deleteTextBlock(title: string) {
    await this.textBlockRepository.destroy({ where: { unique_title: title } });
    return { deleted: true };
  }
}
