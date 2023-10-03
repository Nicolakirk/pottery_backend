const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = ({  adminsData, categoriesData, usersData, productsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS products;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS admins;`);
    })
    .then(() => {
      const categoriesTablePromise = db.query(`
      CREATE TABLE categories (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR
      );`);

      const usersTablePromise = db.query(`
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR
      );`);

      const adminsTablePromise = db.query(`
      CREATE TABLE admins (
        adminName VARCHAR PRIMARY KEY,
        fullName VARCHAR NOT NULL
      
      );`);

      return Promise.all([categoriesTablePromise, usersTablePromise, adminsTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE products (
        product_id VARCHAR NOT NULL,
        title VARCHAR NOT NULL,
        topic VARCHAR NOT NULL REFERENCES categories (slug),
        author VARCHAR NOT NULL REFERENCES admins(adminName),
        body VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        likes INT DEFAULT 0 NOT NULL,
        article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
        more_images VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
        inventory INT DEFAULT 0 NOT NULL,
        price INT DEFAULT 0 NOT NULL
      );`);
    })
    
    .then(() => {
      const insertCategoriesQueryStr = format(
        'INSERT INTO categories (slug, description) VALUES %L;',
        categoriesData.map(({ slug, description }) => [slug, description])
      );
      const categoriesPromise = db.query(insertCategoriesQueryStr);

      const insertUsersQueryStr = format(
        'INSERT INTO users ( username, name, avatar_url) VALUES %L;',
        usersData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      const insertAdminsQueryStr = format(
        'INSERT INTO admins ( adminName, fullName) VALUES %L;',
        adminsData.map(({ adminName, fullName }) => [
          adminName,
          fullName,
         
        ])
      );
      const adminsPromise = db.query(insertAdminsQueryStr);

      return Promise.all([categoriesPromise, usersPromise, adminsPromise]);
    })
    .then(() => {
      const formattedProductData = productsData.map(convertTimestampToDate);
      const insertProductsQueryStr = format(
        'INSERT INTO products (product_id,title, topic, author, body, created_at, likes, article_img_url, more_images, inventory, price) VALUES %L RETURNING *;',
        formattedProductData.map(
          ({
            product_id,
            title,
            topic,
            author,
            body,
            created_at,
            likes = 0,
            article_img_url,
            more_images,
            inventory, 
            price
          }) => [product_id,title, topic, author, body, created_at, likes, article_img_url, more_images, inventory, price]
        )
      );

      return db.query(insertProductsQueryStr);
    })
    .then(({ rows: articleRows }) => {
      const productIdLookup = createRef(articleRows, 'title', 'product_id');
      
    });
};

module.exports = seed;