import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { AddRoleDto } from "./dto/add_role_dto";
import { BanUserDto } from "./dto/ban_user_dto";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { Profile } from "./profile.model";
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}
  async createProfile(dto) {
    const profile = await this.profileRepository.create(dto);

    return profile;
  }
  async getProfiles() {
    const users = await this.profileRepository.findAll({
      include: { all: true },
    });
    return users;
  }
}
