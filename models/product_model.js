const db = require("../db/connection");

exports.fetchProducts = () =>{
   
   let selectProductsQueryString = `SELECT * FROM products`;
  
   return db.query(selectProductsQueryString).then((result) => {
    return result.rows;
  });
};