import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { CreateFileDto } from "./dto/add_file_dto";
import { FileBlock } from "./files.model";
@Injectable()
export class FilesService {
  constructor(
    @InjectModel(FileBlock) private fileRepository: typeof FileBlock
  ) {}
  async createFile(file): Promise<string> {
    try {
      const filename = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fullPath = path.join(filePath, filename);
      fs.writeFileSync(fullPath, file.buffer);
      this.fileRepository.create({ filepath: fullPath });
      return fullPath;
    } catch (error) {
      throw new HttpException(
        "Error occured while saving files",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
