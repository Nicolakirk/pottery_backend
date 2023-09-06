const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = ({ Data, adminsData, categoriesData, usersData, productsDatas }) => {
  return db
    .query(`DROP TABLE IF EXISTS admins;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS products;`);
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
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR
      );`);

      return Promise.all([categoriesTablePromise, usersTablePromise, adminsTablePromise]);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        topic VARCHAR NOT NULL REFERENCES categories (slug),
        author VARCHAR NOT NULL REFERENCES admins(username),
        body VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        likes INT DEFAULT 0 NOT NULL,
        article_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
        more_images VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
        inventory INT DEFAULT 0 NOT NULL
      );`);
    })
    
    .then(() => {
      const insertCategoriesQueryStr = format(
        'INSERT INTO categories (slug, description) VALUES %L;',
        topicData.map(({ slug, description }) => [slug, description])
      );
      const categoriesPromise = db.query(insertCategoriesQueryStr);

      const insertUsersQueryStr = format(
        'INSERT INTO users ( username, name, avatar_url) VALUES %L;',
        userData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      const insertAdminsQueryStr = format(
        'INSERT INTO admins ( username, name, avatar_url) VALUES %L;',
        userData.map(({ username, name, avatar_url }) => [
          username,
          name,
          avatar_url,
        ])
      );
      const adminsPromise = db.query(insertAdminsQueryStr);

      return Promise.all([categoriesPromisePromise, usersPromise, adminsPromise]);
    })
    .then(() => {
      const formattedProductData = productData.map(convertTimestampToDate);
      const insertProductsQueryStr = format(
        'INSERT INTO producsts (title, topic, author, body, created_at, likes, article_img_url, more_images, inventory) VALUES %L RETURNING *;',
        formattedProductData.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            likes = 0,
            article_img_url,
            more_images,
            inventory
          }) => [title, topic, author, body, created_at, likess, article_img_url, more_images, inventory]
        )
      );

      return db.query(insertProductQueryStr);
    })
    .then(({ rows: articleRows }) => {
      const productIdLookup = createRef(articleRows, 'title', 'product_id');
      
    });
};

module.exports = seed;