import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = uuidv4(); // Generate a unique correlation ID
    req["correlationId"] = correlationId; // Attach it to the request
    res.setHeader("x-correlation-id", correlationId); // Set it in the response headers
    next();
  }
}
