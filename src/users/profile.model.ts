import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { TextBlock } from "src/text_block/text_block.model";
import { UserRoles } from "src/roles/user_roles.model";

interface profileCreationAttr {
  name: string;
  surname: string;
  phone: string;
  userID: number;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, profileCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
  })
  phone: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  userID: number;
}
