import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/Login.dto";
import { RegisterDto } from "./dto/Register.dto";
import { User } from "./schemas/user.schema";
import { ConflictException } from "@nestjs/common";

describe("AuthService", () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("validateUser", () => {
    it("should return a JWT token if validation is successful", async () => {
      const loginDto: LoginDto = { username: "testuser", password: "testpass" };
      const user = {
        username: "testuser",
        password: await bcrypt.hash("testpass", 10),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValue(user as User);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwtService, "sign").mockReturnValue("signed-jwt-token");

      const result = await authService.validateUser(loginDto);
      expect(result).toBe("signed-jwt-token");
    });

    it("should return null if user is not found", async () => {
      const loginDto: LoginDto = { username: "testuser", password: "testpass" };

      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);

      const result = await authService.validateUser(loginDto);
      expect(result).toBeNull();
    });

    it("should return null if password is invalid", async () => {
      const loginDto: LoginDto = { username: "testuser", password: "testpass" };
      const user = {
        username: "testuser",
        password: await bcrypt.hash("wrongpass", 10),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValue(user as User);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      const result = await authService.validateUser(loginDto);
      expect(result).toBeNull();
    });
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const registerDto: RegisterDto = {
        username: "newuser",
        password: "newpass",
      };
      const newUser = {
        username: "newuser",
        password: await bcrypt.hash("newpass", 10),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValue(null);
      jest.spyOn(bcrypt, "hash").mockResolvedValue(newUser.password);
      jest.spyOn(userRepository, "create").mockReturnValue(newUser as User);
      jest.spyOn(userRepository, "save").mockResolvedValue(newUser as User);

      const result = await authService.register(registerDto);
      expect(result).toEqual(newUser);
    });

    it("should throw a ConflictException if username already exists", async () => {
      const registerDto: RegisterDto = {
        username: "existinguser",
        password: "newpass",
      };
      const existingUser = { username: "existinguser", password: "hashedpass" };

      jest
        .spyOn(userRepository, "findOne")
        .mockResolvedValue(existingUser as User);

      await expect(authService.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
