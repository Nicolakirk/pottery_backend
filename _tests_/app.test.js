const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test_data/index");
const seed = require("../db/seeds/seed.js")

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

  describe("get/api/products/:product_id", () =>{
    test("status 200 - returns a product object correctly based on an id ", () => {
        return request(app)
            .get('/api/products/1')
            .expect(200)
            .then(({ body }) => {
                
                const { product } = body;
                
                expect(product).toBeInstanceOf(Object);
                expect(product).toMatchObject({
                   title: 'Lovely Vase',
                   author : 'Sammy',
                  product_id : 1,
                    body:"This isa great handmade vase.",
                  topic: "vases",
                likes:0,
                created_at:expect.any(String),
                article_img_url:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                inventory:0,
                price:40.00

            })
    
                })
            })
            })

            test("status 404 - product id doesn't exist",() =>{
                return request(app)
                .get("/api/products/2006")
                .expect(404)
                .then(({ body }) =>{
                    
                    expect(body).toEqual({msg :"Product can not be found"})
                })
            })

            test("status 400 - requests id that doesnt exist with string parameter/wrong data type", () => {
                return request(app)
                .get("/api/products/doesntexist")
               .expect(400)
               .then(({ body }) => {
                expect(body).toEqual({ msg: "Bad Request" });
                 });
   
       });
       test("status 200 - returns the products in descending order by date", ()=>{
        return request(app)
        .get("/api/products")
        .expect(200)
        .then(({ body })=>{
            expect(body.products).toBeSortedBy("created_at",{
                descending:true,
            })
        })
       });

       describe("POST /api/products", ()=>{
        test("201, post request, adds a product to the product list and returns the newly added product",()=>{
const inputProduct = {
    title: "Brown vase",
    
    author:"Sammy",
    body:" This a great brown vase.",
    topic:"vases",

    article_img_url:"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
    more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
    inventory:5,
    price:20.00
}
    return request(app)
    .post("/api/product")
    .send(inputProduct)
    .expect(201)
    .then(({ body })=>{
       console.log(body)
        const { product } = body;
        expect(product).toBeInstanceOf(Object);
        expect(product).toMatchObject({
            product_id:expect.any(Number),
            likes:0,
            created_at:expect.any(String),
            title: "Brown vase",
    topic:"vases",
    author:"Sammy",
    body:" This a great brown vase.",
    article_img_url:"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
    more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',

    inventory:5,
    price:20.00,

        })
    })
        })

       })