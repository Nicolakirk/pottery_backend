const db = require("../db/connection");

exports.fetchProducts = () =>{
   
   let selectProductsQueryString = `SELECT * FROM products`;
  
   return db.query(selectProductsQueryString).then((result) => {
    return result.rows;
  });
};


exports.selectProuctsById = (id )=> {
 
  return db.query(`SELECT * FROM products 
  WHERE products.product_id = $1
  `
  ,[id])
  .then ((result )=>{
    if(result.rows.length === 0){
      return Promise.reject({
        status:404,
        msg:"Product can not be found",
      })
    } else{
      return result.rows[0];
    }
  })
}

exports.insertProduct = ( productBody) =>{
 
  const { title, author, body, topic, likes, article_img_url, more_images, inventory, price } = productBody
  if (author === undefined || author.length === 0){
    return Promise.reject({ status: 400, msg: "invalid input" })
  }
  const psqlQuery = `
  INSERT INTO PRODUCTS
  (title, author, body, topic,  article_img_url, more_images, inventory, price )
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8) 
  RETURNING *;
  `
  return db.query(psqlQuery, [title, author, body, topic,  article_img_url, more_images, inventory, price]).then((result)=>{
    console.log(result)
    return result.rows[0]
  })
}