import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { CorrelationId } from "./correlation-id.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: "just get a simple text back",
    type: String,
  })
  getHello(@CorrelationId() correlationId: string): string {
    console.log(correlationId, "getHello()"); // Log the correlation ID
    return this.appService.getHello(correlationId);
  }
}
