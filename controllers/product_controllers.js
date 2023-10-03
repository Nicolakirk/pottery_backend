const { fetchProducts, selectProuctsById, insertProduct, selectAllProducts, checkTopicExists, changeProductDetails, changeAllProductDetails, removeProductById } = require("../models/product_model");

exports.getProducts = (req, res) =>{
    fetchProducts().then((output) => {
      
        res.status(200).send({ products: output });
      })
      .catch((err)=>{
        next( err);
      })
    };


    exports.getProductsbyId = (req, res, next) =>{
      
const  { product_id } = req.params;

selectProuctsById(product_id).then((product)=>{
  res.status(200).send({ product });
}).catch((err)=>{
next(err);
})

    }

    exports.postProducts = (req,res,next)=>{

console.log(req.body)
      const productBody = req.body;
    

      insertProduct( productBody).then ((product)=>{  
            
            res.status(201).send({ product })
          })
          .catch((err)=>{
            next(err);
          })
          
    };

    exports.getAllProducts = (req, res, next)=>{

      const { topic, sort_by, price, inventory, order }  = req.query;
     
     const productsPromises = [selectAllProducts(topic, sort_by, price, inventory, order)];
    if (topic) {
     productsPromises.push(checkTopicExists(topic))
   }Promise.all(productsPromises)
   .then (([products]) =>{
      res.status(200).send({ products} );
       })
       .catch((err)=>{
         next( err);
       });
     };


     exports.patchPriceForProducts = (req, res, next)=>{
     
      const { product_id }= req.params
      const productBody = req.body

   changeProductDetails(product_id, productBody)
   .then((product)=>{
    res.status(201).send({ product })
    
   })
   .catch((err)=>{
    next(err);
   })
     };


     exports.patchAllForProducts = (req, res, next)=>{
     
      const { product_id }= req.params
   
    
    const { title } = req.body
  
    const { body } = req.body
    const { article_img_url } = req.body
    const { more_images }= req.body
    const { inventory }= req.body
    const  { price } = req.body
   

   changeAllProductDetails(product_id, title,body,article_img_url,more_images, inventory, price )
   .then((product)=>{
    res.status(201).send({ product })
    
   })
   .catch((err)=>{
    next(err);
   })
     };

     exports.deleteProduct = (req, res, next) =>{
      const { product_id }= req.params;
  
  removeProductById(product_id).then((products)=>{
      res.status(204).send({ products});
  })
  .catch((err)=>{
      next(err);
  })
  };