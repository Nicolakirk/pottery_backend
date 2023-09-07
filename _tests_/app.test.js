const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test_data/index");
const seed = require("../db/seeds/seed.js")
g
beforeEach(() => seed(testData));
afterAll(() => db.end());

const app = require("../app");
const { convertTimestampToDate } = require("../db/seeds/utils.js");

describe("GET/api/products", () => {
    test("status:200 - responds with an array of products, with title, topic, author, body, created at, likes, article img, ,more images, inventory, price properties", () => {
        return request(app)
            .get("/api/products")
            .expect(200)
            .then(({ body }) => {
                const { products } = body;
                expect(products).toBeInstanceOf(Array);
                expect(products).toHaveLength(2);
                products.forEach((product) => {
                    expect(product).toMatchObject({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body:expect.any(String),
                        created_at: expect.any(String),
                        inventory: expect.any(Number),
                        price: expect.any(Number)
                    });
                });
            })
        })
        it("status 404 - not a route/path ", () => {
            return request(app)
                .get("/api/badroute")
                .expect(404)
                .then(({ body }) => {
                    expect(body.message).toBe("Bad request");
                });
})
  });