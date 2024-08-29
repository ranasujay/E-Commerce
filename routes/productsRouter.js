const express = require('express');
const router = express.Router();
const uplode = require("../config/multer-config");
const productModel = require("../models/product-model");

// router.get("/", function(req,res){
//     res.send("hey it is working");
// });

router.post("/create", uplode.single("image"),  async function(req,res){
    let {name,price,bgcolor,panelcolor,discount,textcolor} = req.body;
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        bgcolor,
        panelcolor,
        discount,
        textcolor
    });
    res.redirect("/owners/admin");
});

module.exports =  router;

