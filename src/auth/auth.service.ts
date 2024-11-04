import { Body, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./modells/User";
import { LoginDto } from "./dto/Login.dto";

const fakeUsers: Array<User> = [{ username: "test", password: "test" }];
@Injectable()
export class AuthService {
  constructor(private jwtservice: JwtService) {}
  validateUser(loginDto: LoginDto): string | null {
    console.debug("validateUser auth service", loginDto);
    const findUser: User = fakeUsers.find(
      (user: User) => user.username === loginDto.username,
    );
    if (!findUser) {
      return null; // User not found
    }
    if (findUser.password !== loginDto.password) {
      return null; // Wrong password
    }
    return this.jwtservice.sign({ username: loginDto.username });
  }
}
