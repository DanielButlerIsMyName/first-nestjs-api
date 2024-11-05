import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = req["correlationId"]; // Retrieve the correlation ID from the request
    const msg = `corrId: ${correlationId} -> caller ip: ${req.ip} | baseUrl: ${req.url} | verb: ${req.method}`;
    Logger.debug(msg);
    next();
  }
}
