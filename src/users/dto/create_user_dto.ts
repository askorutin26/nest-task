import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Should be string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @IsString({ message: "Should be string" })
  @Length(4, 16, { message: "Length should be from 4 to 16" })
  readonly password: string;

  @IsString({ message: "Should be string" })
  readonly name: string;

  @IsString({ message: "Should be string" })
  readonly surname: string;

  @IsString({ message: "Should be string" })
  readonly phone: string;
}
