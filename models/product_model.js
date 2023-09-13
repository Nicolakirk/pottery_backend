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
   
    return result.rows[0]
  })
};


exports.selectAllProducts = (topic, sort_by = "created_at" , order="desc" ) =>{
     
      
  let queryString = `SELECT * FROM products
  ORDER BY ${sort_by} ${order} `

  const queryPsql = `SELECT * FROM products WHERE topic = $1
  ORDER BY ${sort_by} ${order}`
 const sortQuery =`SELECT * FROM products
ORDER BY ${sort_by} ${order} `


      const orderQuery =` SELECT * FROM products
      ORDER BY product_id ${order}`
      
      if (!["asc", "desc"].includes(order)) {
       return Promise.reject({ status: 400, msg: "invalid order query" })
      }
       if ( !["title","topic", "author", "created_at", "product_id", "likes", "price", "inventory" ].includes(sort_by)){
         return Promise.reject({status:400, msg :"Invalid sort query"})
     }
      if (!topic  && sort_by === "created_at" && order === "desc"){
       return db.query (queryString, []).then ((result)=>{
       
           return result.rows
         })
         }
       
if (topic && sort_by && order) {

return db.query(queryPsql,[topic])
 .then ((result) =>{
  
 return result.rows

})  

}
if (!topic){
 return db.query(sortQuery, []).then((result)=>{
 
   return result.rows
})
  


}if ( !topic && sort_by === "created_at"){
 return db.query(orderQuery, []).then((result)=>{
  
   return result.rows;
 })
}
}


exports.checkTopicExists = (topic) => {

  return db.query(` SELECT * FROM topics WHERE slug = $1`, [topic])
    .then((result)=>{
  
  if(result.rowCount === 0){
  
            return Promise.reject({status:404, msg: 'Topic not found'})
        } else {
            return result.rows[0]
        }
    })
  };

  exports.changeProductDetails = (id, price) =>{


    const  product_id  = id
    const new_price  = price
    // const { new_description } = description
    // const { new_title } = title
    // const { new_inventory } = inventory
    // const { new_article_img_url } = article_img_url
    // const { new_more_images } = more_images
    // const { new_topic } = topic

    const firstPsqlQuery = `SELECT * from products WHERE product_id =$1;`

    const priceQuery = `
    UPDATE products 
    SET price  = $2
    WHERE product_id = $1
    RETURNING *;`

    return db.query(firstPsqlQuery,[product_id ])
    .then((results)=>{
if ( results.rows.length === 0){
  return Promise.reject({
    status:404, msg:"Not found"
  })
} else {
  return db.query(priceQuery,[product_id,new_price])
}
    }).then((results)=>{
      
      return results.rows[0]
    })
  }