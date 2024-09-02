const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model")


router.get("/", function(req,res){
    res.render("index");
});
router.get("/shop", isLoggedin, async function(req,res){
    let products = await productModel.find();
    res.render("shop",{products});
});
router.get("/cart", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    res.render("cart");
});
// router.post("/cart", isLoggedin,)



module.exports =  router;
