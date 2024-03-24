const crypto = require("node:crypto");
const request = require("supertest");
const app = require("../../src/app");
const tables = require("../../src/tables");
const database = require("../../database/client");

describe("CREATE USER", () => {
  it("should return created user", async () => {
    const myUser = {
      firstname: "Marie",
      lastname: "Martin",
      pseudo: "mama",
      email: `${crypto.randomUUID()}@wild.co`,
      birthdate: "1990-01-01",
    };
    const hashedPassword = `${crypto.randomUUID()}`;
    const { insertId } = await tables.user.create(myUser, hashedPassword);
    const [rows] = await database.query(
      `SELECT * FROM user WHERE id = ?`,
      insertId
    );
    const foundUser = rows[0];
    expect(foundUser).toBeDefined();
    expect(foundUser.pseudo).toBe(myUser.pseudo);
  });

  it("should throw when passing invalid object", async () => {
    const promise = tables.user.create({});
    await expect(promise).rejects.toThrow();
  });
});

describe("GET /api/user", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/user");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});

afterAll((done) => {
  database.end().then(done);
});
