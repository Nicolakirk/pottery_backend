const express = require("express");
const app = express();
const cors = require('cors');
const { getProducts } = require("./controllers/product_controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
app.use(cors());
app.use(express.json());

app.get ('/api/products', getProducts);

app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
