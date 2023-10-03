const express = require("express");
const app = express();
const cors = require('cors');
const stripe = require("stripe")("sk_test_51NwnyALSqeSGrFJiMVGidHVFXxvEQ6ARdL2PNpE0HaWRr0axWPw3DHRz6FEeiSG0vZrc1Frxk0VKpwErNInRtQWg00DOGSNqCf")

const { getProducts, getProductsbyId, postProducts, getAllProducts, patchPriceForProducts, patchAllForProducts, deleteProduct } = require("./controllers/product_controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
const { getUsers, getUsersById } = require("./controllers/user_controller");
const { getAdmins, getAdminsById } = require("./controllers/admin_controllers");
const { getCategories } = require("./controllers/category_controllers");
const { endpoints } = require("./controllers/api_controller");
const { getCheckout } = require("./controllers/checkout_controller");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

app.post("/checkout", getCheckout)

app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);


module.exports = app;
