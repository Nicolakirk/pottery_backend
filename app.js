const express = require("express");
const app = express();
const cors = require('cors');
const { getProducts, getProductsbyId, postProducts, getAllProducts, patchPriceForProducts, patchAllForProducts, deleteProduct } = require("./controllers/product_controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
const { getUsers, getUsersById } = require("./controllers/user_controller");
const { getAdmins, getAdminsById } = require("./controllers/admin_controllers");
const { getCategories } = require("./controllers/category_controllers");
const { endpoints } = require("./controllers/api_controller");
app.use(cors());
app.use(express.json());

app.get('/api', endpoints)
app.get ('/api/products', getAllProducts);
app.get('/api/products/:product_id', getProductsbyId)
app.post('/api/product', postProducts)
app.get('/api/users',getUsers );
app.get('/api/users/:username', getUsersById );
app.get('/api/admins', getAdmins)
app.get("/api/admins/:adminname", getAdminsById)
app.get("")
app.patch("/api/products/:product_id", patchPriceForProducts)
app.patch("/api/productsupdate/:product_id", patchAllForProducts)
app.get("/api/categories", getCategories)
app.delete("/api/products/:product_id", deleteProduct)
app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
