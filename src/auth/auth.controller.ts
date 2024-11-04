import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/Login.dto";
import { LocalGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post("login")
  login(@Body() requestData: LoginDto): string | null {
    const token = this.authService.validateUser(requestData);
    if (!token) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get("status")
  status(@Req() req) {
    console.debug("status", req.user);
    return req.user;
  }
}
