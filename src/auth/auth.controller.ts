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
import { RegisterDto } from "./dto/Register.dto";
import { LocalGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post("login")
  async login(@Body() requestData: LoginDto) {
    const token = await this.authService.validateUser(requestData);
    if (!token) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return { token };
  }

  @Post("register")
  async register(@Body() registerData: RegisterDto) {
    console.log("Received Register Data:", registerData); // This should show the incoming data structure

    const user = await this.authService.register(registerData);
    return { message: "User registered successfully", user };
  }

  @UseGuards(JwtAuthGuard)
  @Get("status")
  status(@Req() req) {
    return req.user;
  }
}
