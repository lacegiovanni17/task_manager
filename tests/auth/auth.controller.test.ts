import request from "supertest";
import app from "../../src/index"; // or your Express app entry file
import mongoose from "mongoose";

describe("Auth Controller", () => {
  // Setup test DB connection if needed
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    first_name: "Test",
    last_name: "User",
    email: `testuser+${Date.now()}@example.com`, // ✅ Unique email
    password: "Password@123",
    phone_number: "+1234567890",
    user_role: "user",
  };

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(testUser);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.email).toBe(testUser.email);
    }, 10000); // 👈 Increase timeout to 10s
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login a user and return token", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data.user.email).toBe(testUser.email);
    });
  });
});
