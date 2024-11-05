import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(correlationId: string): string {
    // Optionally log or process the correlation ID
    return `Hello World! Correlation ID: ${correlationId}`;
  }
}
