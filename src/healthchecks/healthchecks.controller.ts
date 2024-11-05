import { Controller, Get } from "@nestjs/common";

@Controller("healthchecks")
export class HealthchecksController {
  @Get("/")
  getHelloWorld() {
    return "Hello World!";
  }

  @Get("/wait2s")
  async getWait2s() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Await 2s!";
  }

  @Get("/healthcheck")
  getHealthCheck() {
    return "healthy!";
  }

  @Get("/version")
  getVersion() {
    return "1.0.1";
  }
}
