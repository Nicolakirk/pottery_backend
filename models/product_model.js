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
 
  const { product_id,title, author, body, topic, likes, article_img_url, more_images, inventory, price } = productBody
  if (author === undefined || author.length === 0){
    return Promise.reject({ status: 400, msg: "invalid input" })
  }
  const psqlQuery = `
  INSERT INTO PRODUCTS
  (product_id,title, author, body, topic,  article_img_url, more_images, inventory, price )
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9 )
  RETURNING *;
  `
  return db.query(psqlQuery, [product_id, title, author, body, topic,  article_img_url, more_images, inventory, price]).then((result)=>{
   
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

  exports.changeProductDetails = (id, productBody) =>{

   
    const  product_id  = id

    const firstPsqlQuery = `SELECT * from products WHERE product_id =$1;`
  
    const priceQuery = `
    UPDATE products 
    SET price  = $2
    WHERE product_id = $1
    RETURNING *;`

    const inventoryQuery = `
    UPDATE products 
    SET inventory  = $2
    WHERE product_id = $1
    RETURNING *;`

    const titleQuery = `
    UPDATE products 
    SET title = $2
    WHERE product_id = $1
    RETURNING *;`

    const bodyQuery = `
    UPDATE products 
    SET body = $2
    WHERE product_id = $1
    RETURNING *;`



    return db.query(firstPsqlQuery,[product_id ])
    .then((results)=>{
if ( results.rows.length === 0){
  return Promise.reject({
    status:404, msg:"Not found"
  })
} if (results.rows.length !== 0 && "price"in productBody ) {
  const { price } = productBody
  return db.query(priceQuery,[product_id,price])

}if (results.rows.length !== 0 && "inventory"in productBody ) {
  const { inventory } = productBody
  return db.query(inventoryQuery,[product_id,inventory])
}
if (results.rows.length !== 0 && "title"in productBody ) {
  const { title} = productBody
  return db.query(titleQuery,[product_id,title])
} 
if (results.rows.length !== 0 && "body"in productBody ) {
  const { body } = productBody
  return db.query(titleQuery,[product_id,body])
}

    }).then((results)=>{
      
      return results.rows[0]
    })
  }


  exports.changeAllProductDetails = (id, title, body, article_img_url, more_images, inventory, price) =>{

  
   
    const firstPsqlQuery = `SELECT * from products WHERE product_id =$1;`

    const secondQuery = `
    UPDATE products 
    SET 
    title = $2,
  body = $3,
     article_img_url = $4,
    more_images = $5,
    inventory = $6,
   price = $7
    WHERE product_id = $1
    RETURNING *;`
    return db.query(firstPsqlQuery,[id ])
    .then((results)=>{
if ( results.rows.length === 0){
  return Promise.reject({
    status:404, msg:"Not found"
  })
} else {
  return db.query(secondQuery,[id,title,body,article_img_url,more_images, inventory, price])
  .then((results)=>{
    return results.rows[0]
  })
}
})
  };


  exports.removeProductById = (id) =>{
      
    const psqlDeleteQuery = ` 
    DELETE FROM products 
    WHERE product_id = $1; `
   
    const firstPsqlQuery = `SELECT * FROM products WHERE product_id = $1 ;`
    
    return db.query(firstPsqlQuery,[id] )
    .then((results) => {
       
        if (results.rows.length === 0){
            return Promise.reject({ status: 404, msg: "Not found" });
        } else { return db.query(psqlDeleteQuery, [id])
            
        
        }}).then((results) =>{

            return results
        })
        } 