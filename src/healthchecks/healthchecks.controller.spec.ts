import { Test, TestingModule } from "@nestjs/testing";
import { HealthchecksController } from "./healthchecks.controller";

describe("HealthchecksController", () => {
  let controller: HealthchecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthchecksController],
    }).compile();

    controller = module.get<HealthchecksController>(HealthchecksController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it('should return "Hello World!" for GET /', () => {
    expect(controller.getHelloWorld()).toBe("Hello World!");
  });

  it('should return "Await 2s!" after waiting for 2 seconds for GET /wait2s', async () => {
    const result = await controller.getWait2s();
    expect(result).toBe("Await 2s!");
  });

  it('should return "healthy!" for GET /healthcheck', () => {
    expect(controller.getHealthCheck()).toBe("healthy!");
  });

  it('should return "1.0.1" for GET /version', () => {
    expect(controller.getVersion()).toBe("1.0.1");
  });
});
