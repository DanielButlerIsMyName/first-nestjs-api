import { Injectable, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "./schemas/user.schema";
import { LoginDto } from "./dto/Login.dto";
import { RegisterDto } from "./dto/Register.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    console.log("JwtService in AuthService:", this.jwtService); // Debugging
    console.log("userModel in AuthService:", this.userModel); // Debugging
  }
  async validateUser(loginDto: LoginDto): Promise<string | null> {
    const user = await this.userModel
      .findOne({ username: loginDto.username })
      .exec();
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return this.jwtService.sign({ username: user.username });
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;

    console.log("Username:", username); // Debugging
    console.log("Password:", password); // Debugging

    if (!password) {
      throw new Error("Password is undefined");
    }

    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new ConflictException("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
