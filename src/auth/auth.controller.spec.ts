import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/Login.dto";
import { RegisterDto } from "./dto/Register.dto";
import { UnauthorizedException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Test, TestingModule } from "@nestjs/testing";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should return a token if credentials are valid", async () => {
      const loginDto: LoginDto = { username: "test", password: "test" };
      const token = "testToken";
      jest.spyOn(authService, "validateUser").mockResolvedValue(token);

      const result = await controller.login(loginDto);
      expect(result).toEqual({ token });
    });

    it("should throw UnauthorizedException if credentials are invalid", async () => {
      const loginDto: LoginDto = { username: "test", password: "test" };
      jest.spyOn(authService, "validateUser").mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe("register", () => {
    it("should return a success message and user data", async () => {
      const registerDto: RegisterDto = {
        username: "test",
        password: "test",
      };
      const user = { id: 1, ...registerDto };
      jest.spyOn(authService, "register").mockResolvedValue(user);

      const result = await controller.register(registerDto);
      expect(result).toEqual({
        message: "User registered successfully",
        user,
      });
    });
  });

  describe("status", () => {
    it("should return the user from the request", () => {
      const req = { user: { username: "test" } };
      const result = controller.status(req);
      expect(result).toEqual(req.user);
    });
  });
});
