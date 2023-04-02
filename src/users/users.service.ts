import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create_user_dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add_role_dto";
import { BanUserDto } from "./dto/ban_user_dto";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ProfileService } from "./profile.service";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private profileService: ProfileService
  ) {}
  async createUser(dto: CreateUserDto) {
    const { email, password, name, surname, phone } = dto;

    const user = await this.userRepository.create({ email, password });

    const createdUser = this.getUserByEmail(email);
    const { id: userID } = await createdUser;

    const profile = await this.profileService.createProfile({
      name,
      surname,
      phone,
      userID,
    });
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }
  async getUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userID);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Can't find user or role", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Can't find user", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
