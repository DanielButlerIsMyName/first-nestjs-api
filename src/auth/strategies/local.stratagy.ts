import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { LoginDto } from "../dto/Login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    console.debug("validate user local strategy", username, password);
    const user = new LoginDto();
    user.username = username;
    user.password = password;
    const token = this.authService.validateUser(user);
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }
}
