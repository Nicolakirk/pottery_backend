const { fetchProducts, selectProuctsById, insertProduct } = require("../models/product_model");

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

    exports.postProducts= (req,res,next)=>{

      const productBody = req.body;
    

      insertProduct(productBody).then ((product)=>{  
            console.log(product)
            res.status(201).send({ product })
          })
          .catch((err)=>{
            next(err);
          })
          
    }