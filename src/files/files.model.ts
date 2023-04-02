import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import { TextBlock } from "src/text_block/text_block.model";

interface FileCreationAttr {
  filepath: string;
  essence_table: string;
  essense_id: number;
}

@Table({ tableName: "files" })
export class FileBlock extends Model<FileBlock, FileCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  filepath: string;

  @Column({
    type: DataType.STRING,
  })
  essence_table: string;

  @Column({
    type: DataType.INTEGER,
  })
  essense_id: number;
}
