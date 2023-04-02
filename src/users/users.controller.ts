import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt_auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles_auth.decorator";
import { AddRoleDto } from "./dto/add_role_dto";
import { BanUserDto } from "./dto/ban_user_dto";
import { CreateUserDto } from "./dto/create_user_dto";
import { UsersService } from "./users.service";
import { ValidationPipe } from "@nestjs/common";
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getUsers();
  }

  @Roles("ADMIN")
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
