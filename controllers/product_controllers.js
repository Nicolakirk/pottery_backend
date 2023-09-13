const { fetchProducts, selectProuctsById, insertProduct, selectAllProducts, checkTopicExists, changeProductDetails } = require("../models/product_model");

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
      const { price  } = req.body

   changeProductDetails(product_id, price)
   .then((product)=>{
    res.status(201).send({ product })
    
   })
   .catch((err)=>{
    next(err);
   })
     }