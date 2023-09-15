const { fetchCategories } = require("../models/categories_model");

exports.getCategories = (req, res, next) =>{
    fetchCategories().then((output) => {
      console.log(output)
        res.status(200).send({ categories : output });
      })
      .catch((err)=>{
        next( err);
      })
    };