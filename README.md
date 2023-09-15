Nicola Kirk - Pottery store API



About
pottery is pottery store built using this API . The data is pulled from a custom built api hosted here:



Available Endpoints




get /api/products
get /api/products/:product_id
patch /api/products/:product_id
post /api/product
get /api/users
get /api/users/:username
get api/admins
get /api/admins/:adminname
patch /api/products/:product_id
patch /api/productsupdate/:product_id
get /api/categories


How to install
git clone https://github.com/Nicolakirk/pottery_backend.git

Clone the repository from github to your project folder

npm install

Install all the needed node packages

DEPENDENCIES -
You will need to create  .env.development & .env.test files
with the following details added respectively;
PGDATABASE = pottery

PGDATABASE = pottery_test


npm start to start the api

Run the app in development mode.


The page will reload if you make edits.
You will also see any errors in the console.

Features
view a list of all products
view a list of all categories
view an individual product

sort products by: date created, price etc
add a new product
delete products
make changes to a product

minimum reqyuirements
node version 2.2
Postgress 