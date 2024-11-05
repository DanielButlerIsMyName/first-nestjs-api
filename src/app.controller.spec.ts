import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect((res) => {
        // Check response contains the initial part of the expected text
        expect(res.text).toMatch(/Hello World! Correlation ID:/);

        // Check for the presence of the x-correlation-id header
        expect(res.headers).toHaveProperty("x-correlation-id");
        expect(res.headers["x-correlation-id"]).toBeDefined();
      });
  });
});
