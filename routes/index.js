const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model")


router.get("/", async function(req,res){
    // let error =  await req.body.error;
    // console.log(error);
    res.render("index", {error:""});
});
router.get("/shop", isLoggedin, async function(req,res){
    let products = await productModel.find();
    res.render("shop",{products});
});
router.get("/cart", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    res.render("cart");
});
router.get("/account", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    res.send("it your account");
});
// router.post("/cart", isLoggedin,)



module.exports =  router;
