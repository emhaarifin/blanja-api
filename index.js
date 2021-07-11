require('dotenv').config()
const express = require("express")
const logger = require("morgan");
const cors = require('cors')
// const jsonParser = express.json();
const product = require("./src/route/product")
const category = require("./src/route/category")
const orderSeller = require("./src/route/orderSeller")
const port = process.env.DB_PORT;
const app = express();


// use express add
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"));
app.use((_, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // next();

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization'); // If needed
    res.header('Access-Control-Allow-Credentials', true); // If needed
    next()
});
// app.use(express.static("public"));


app.listen(port,()=>{
    console.log("server on using port", port);
})


app.use("/products", product);
app.use("/category", category);
app.use("/order/seller", orderSeller)

module.exports = app

