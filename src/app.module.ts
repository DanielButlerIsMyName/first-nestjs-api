import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthchecksController } from "./healthchecks/healthchecks.controller";
import { CorrelationIdMiddleware } from "./correlation-id.middleware";
import { LoggerMiddleware } from "./logger.middleware";
import { User } from "./auth/schemas/user.schema";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mariadb",
        host: "localhost",
        port: 3306,
        username: configService.get<string>("MYSQL_USER", "nest_user"),
        password: configService.get<string>("MYSQL_PASSWORD", "nest_password"),
        database: configService.get<string>("MYSQL_DATABASE", "nest_db"),
        entities: [User],
        synchronize: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController, HealthchecksController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware, LoggerMiddleware) // Apply CorrelationIdMiddleware first
      .forRoutes("*"); // Apply globally
  }
}
