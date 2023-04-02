import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create_user_dto";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/logIn")
  logIn(@Body() userDto: CreateUserDto) {
    return this.authService.logIn(userDto);
  }

  @Post("/signUp")
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
