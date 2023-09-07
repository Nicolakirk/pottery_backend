const { fetchProducts } = require("../models/product_model");

exports.getProducts = (req, res) =>{
    fetchProducts().then((output) => {
      
        res.status(200).send({ products: output });
      })
      .catch((err)=>{
        next( err);
      })
    };