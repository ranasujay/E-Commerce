const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");



router.get("/", async function(req,res){
    // let error =  await req.body.error;
    // console.log(error);
    res.render("index", {error:""});
});
router.get("/shop", isLoggedin, async function(req,res){
    let products = await productModel.find();
    res.render("shop",{products: products});
});
router.get("/cart", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    res.render("cart");
});
router.get("/account", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    let user1 = req.user;
    let user_email = user1.email;
    let user = await userModel.findOne({email: user_email});
    
    res.render("account",{email:user.email, phone:user.contact, profilePicture:user.picture});

});

router.get("/ownershop", isLoggedin, async function(req,res){
    let user = req.user;
    let user_email = user.email;
    let owner = await ownerModel.findOne({email: user_email});
    if(!owner){
        res.status(404).send("Access Denied");
    }
    let products = await productModel.find();

    res.render("./ownerspages/shop", {products});
});

router.get("/owneraccount", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    let user = req.user;
    let user_email = user.email;
    let owner = await ownerModel.findOne({email: user_email});
    if(!owner){
        res.status(404).send("Access Denied");
    }
    res.send("owner account");
});



module.exports =  router;
