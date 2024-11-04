import { IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  readonly password: string;
}
