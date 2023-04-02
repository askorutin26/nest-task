import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";
import { UserRoles } from "src/roles/user_roles.model";

interface TextBlockCreationAttr {
  unique_title: string;
  name: string;
  text: string;
  group_name: string;
  image: string;
}

@Table({ tableName: "text_block" })
export class TextBlock extends Model<TextBlock, TextBlockCreationAttr> {
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
  unique_title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  group_name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;
}
