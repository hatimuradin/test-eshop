const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: `.env_${process.env.NODE_ENV}` });
const authJwt = require("./helpers/jwt");

app.use(cors());
app.options("*", cors());

// Midleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt);

// Routers
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
    .connect(process.env.DB)
    .then(() => {
        console.log("database connection is ready");
    })
    .catch((err) => {
        console.log(err);
    });

var server = app.listen(3001, () => {
    console.log("server running on 3001 port");
});

module.exports = server;
