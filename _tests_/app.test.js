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
            .get('/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47')
            .expect(200)
            .then(({ body }) => {
                
                const { product } = body;
                
                expect(product).toBeInstanceOf(Object);
                expect(product).toMatchObject({
                   title: 'Lovely Vase',
                   author : 'Sammy',
                  product_id : 'price_1Nwo6FLSqeSGrFJihDSgcK47',
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
               .expect(404)
               .then(({ body }) => {
                expect(body).toEqual({ msg: "Product can not be found" });
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
    product_id:"price_1Nwo6FLSqeSGrFJihDSgcK48",
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
      
        const { product } = body;
        expect(product).toBeInstanceOf(Object);
        expect(product).toMatchObject({
            
            likes:0,
            created_at:expect.any(String),
            title: "Brown vase",
           
    topic:"vases",
product_id:"price_1Nwo6FLSqeSGrFJihDSgcK48",
    author:"Sammy",
    body:" This a great brown vase.",
    article_img_url:"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
    more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',

    inventory:5,
    price:20.00,

        })
    })
        })
        test("status 400, mssimg values on post ",()=>{
            const inputProduct = {
                title: "Brown vase",
                
                author:"Sammy",
                body:" This a great brown vase.",
                topic:"vases",
            
                article_img_url:"https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700",
                more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                inventory:5, 
            }
            return request(app)
            .post("/api/product")
            .send(inputProduct)
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request");
            })

        })

       });
       describe("get /api/users",()=>{
       test("status 200, responds with an array of user objects",()=>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then (({body}) =>{
            const { users } = body
            
            expect(users).toBeInstanceOf(Array);
            expect(users).toHaveLength(4)
            users.forEach((user)=>{
                expect(user).toMatchObject({
                    username: expect.any(String),
                         name: expect.any(String),
                         avatar_url:expect.any(String),
                })
            })
        })
       })
       })

       describe ("get/api/users/username",()=>{
        test("status 200, responds with the user for the name requested",()=>{
            return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({body})=>{
                const { user } = body;
                expect(user).toBeInstanceOf(Object);
                expect(user).toMatchObject({
                    username:'butter_bridge',
                    name: 'jonny',
                    avatar_url:
                      'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
                })
            })
        })
       })
       describe("get /api/admins",()=>{
        test("status 200, responds with an array of admin objects",()=>{
         return request(app)
         .get("/api/admins")
         .expect(200)
         .then (({body}) =>{
             const { admins } = body
            
             expect(admins).toBeInstanceOf(Array);
             expect(admins).toHaveLength(2)
             admins.forEach((admin)=>{
                 expect(admin).toMatchObject({
                     adminname: expect.any(String),
                          fullname: expect.any(String),
                         
                 })
             })
         })
        })
        })
        describe ("get/api/admins/adminname",()=>{
            test("status 200, responds with the admin for the name requested",()=>{
                return request(app)
                .get("/api/admins/nic")
                .expect(200)
                .then(({body})=>{
                    const { admin } = body;
                    expect(admin).toBeInstanceOf(Object);
                    expect(admin).toMatchObject({
                        adminname:'nic',
                        fullname: 'Nicola Kirk'
                       
                    })
                })
            })
           })
           describe("ORDER asc/desc for sort_by queries on /api/products", () => {
            it("200: returns array of products in decending order for specified colum", () => {
              return request(app)
                .get("/api/products?sort_by=price&&order=desc")
                .expect(200)
                .then(({ body }) => {
                  const { products} = body;
                  expect(products).toBeInstanceOf(Array);
                  expect(products).toHaveLength(2);
                  expect(products).toBeSortedBy("price", { descending: true });
                });
            });
            it("200: returns array of products in ascending order for specified colum", () => {
                return request(app)
                  .get("/api/products?sort_by=author&&order=asc")
                  .expect(200)
                  .then(({ body }) => {
                    const { products} = body;
                    expect(products).toBeInstanceOf(Array);
                    expect(products).toHaveLength(2);
                    expect(products).toBeSortedBy("author", { ascending: true });
                  });
              });
           
        });

        test("status 200 - changes price of a products correctly and returns the updated product ", () => {
            const update = { price: 30.00 };
            return request(app)
                .patch("/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47")
                .send(update)
                .expect(201)
                .then(({ body }) => {
                   const { product } = body;
                    
                    expect(product).toMatchObject({
                        title: 'Lovely Vase',
                        topic: 'vases',
                        author: 'Sammy',
                        body: 'This isa great handmade vase.',
                        created_at:expect.any(String),
                        likes: 0,
                        article_img_url:
                          'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                          more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                          inventory:0,
                          price:30.00
                       
                    });
                })
            })

            test("status 200 - changes inevntory of a products correctly and returns the updated product ", () => {
                const update = { inventory: 5 };
                return request(app)
                    .patch("/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47")
                    .send(update)
                    .expect(201)
                    .then(({ body }) => {
                       const { product } = body;
                      
                        expect(product).toMatchObject({
                            title: 'Lovely Vase',
                            topic: 'vases',
                            author: 'Sammy',
                            body: 'This isa great handmade vase.',
                            created_at:expect.any(String),
                            likes: 0,
                            article_img_url:
                              'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                              more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                              inventory:5,
                              price:40.00
                           
                        });
                    })
                })
                test("status 200 - changes title of a product correctly and returns the updated product ", () => {
                    const update = { title:"blue vase" };
                    return request(app)
                        .patch("/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47")
                        .send(update)
                        .expect(201)
                        .then(({ body }) => {
                           const { product } = body;
                          
                            expect(product).toMatchObject({
                                title: 'blue vase',
                                topic: 'vases',
                                author: 'Sammy',
                                body: 'This isa great handmade vase.',
                                created_at:expect.any(String),
                                likes: 0,
                                article_img_url:
                                  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                  more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                  inventory:0,
                                  price:40.00
                               
                            });
                        })
                    })
                    test("status 200 - changes description of a product correctly and returns the updated product ", () => {
                        const update = { body:"A handmdade vase" };
                        return request(app)
                            .patch("/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47")
                            .send(update)
                            .expect(201)
                            .then(({ body }) => {
                               const { product } = body;
                              
                                expect(product).toMatchObject({
                                    title: 'A handmdade vase',
                                    topic: 'vases',
                                    author: 'Sammy',
                                    body: 'This isa great handmade vase.',
                                    created_at:expect.any(String),
                                    likes: 0,
                                    article_img_url:
                                      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                      more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                      inventory:0,
                                      price:40.00
                                   
                                });
                            })
                        })

                        test("status 200 - changes all the keys of a product correctly and returns the updated product ", () => {
                            const update = { title: 'A vase',
                           
                            body: 'This is a great vase.',
                            article_img_url:
                              'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                              more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                              inventory:0,
                              price:5.00 };
                            return request(app)
                                .patch("/api/productsupdate/price_1Nwo6FLSqeSGrFJihDSgcK47")
                                .send(update)
                                .expect(201)
                                .then(({ body }) => {
                                   const { product } = body;
                                  
                                    expect(product).toMatchObject({
                                        title: 'A vase',
                                        topic: 'vases',
                                        author: 'Sammy',
                                        body: 'This is a great vase.',
                                        created_at:expect.any(String),
                                        likes: 0,
                                        article_img_url:
                                          'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                          more_images:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
                                          inventory:0,
                                          price:5.00
                                       
                                    });
                                })
                            })
                            describe("get an arrray of categories",()=>{
                                test("returns an array of all categories",()=>{
                                    return request(app)
                                    .get("/api/categories")
                                    .expect(200)
                                    .then(({body})=>{
                                        const { categories } = body 
                                     console.log(body)
                                        expect(categories).toBeInstanceOf(Array);
                                        expect(categories).toHaveLength(3);
                                       categories.forEach((category)=>{
                                            expect(category).toMatchObject({
                                                description:expect.any(String),
                                                slug:expect.any(String)
                                            })
                                        })
                                    })
                                })
                            })
                            describe(". DELETE /api/products/:product_id",()=>{
                                test("Status 204 ,deletes product and returns 204 status, checks the array has removed one comment",()=>{
                                    return request(app)
                                    .delete("/api/products/price_1Nwo6FLSqeSGrFJihDSgcK47")
                                    .expect(204);
                                        
                                })
                            })