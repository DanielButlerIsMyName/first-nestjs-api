import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request["correlationId"]; // Retrieve the correlation ID from the request
  },
);
