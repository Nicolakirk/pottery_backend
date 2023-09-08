const express = require("express");
const app = express();
const cors = require('cors');
const { getProducts, getProductsbyId, postProducts } = require("./controllers/product_controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
app.use(cors());
app.use(express.json());

app.get ('/api/products', getProducts);
app.get('/api/products/:product_id', getProductsbyId)
app.post('/api/product', postProducts)

app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
