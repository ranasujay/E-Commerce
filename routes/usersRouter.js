const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/product-model")


// router.get("/", function(req,res){
//     res.send("hey it is working");
// });

router.post("/register",  async function(req,res){
    // res.send("hello");
    let {fullname, email, password} = req.body;

    let user =  await userModel.findOne({email: email});
    if(user) res.status(401).send("already have account");


    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function( err, hash){
            if(err) res.send(err.massage);
            else{
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                // res.send(user);
                let token = jwt.sign({email, id: user._id}, "secret");
                res.cookie("token", token);
                res.send("user created");

            }
        })
    })

    

});

router.post("/login", async function(req,res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    let products = await productModel.find();
    if(!user) res.send("Email or password incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email, id: user._id}, "secret");
            res.cookie("token", token);
            res.render("shop",{products});
        }
        else{
            res.send("Email or password incorrect");
        }
    })
    
});
router.get("/logout", async function(req,res){
            res.cookie("token", "");
            res.redirect("/");
});


module.exports =  router;

