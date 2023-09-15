const db = require("../db/connection");

exports.fetchCategories = () =>{
   
   let selectCategoriesQueryString = `SELECT * FROM categories`;
  
   return db.query(selectCategoriesQueryString).then((result) => {
    console.log(result.rows)
    return result.rows;
  });
};