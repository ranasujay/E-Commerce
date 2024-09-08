const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../models/product-model")
const ownerModel = require("../models/owner-model")




router.post("/register",  async function(req,res){
    // res.send("hello");
    let {fullname, email, password} = req.body;

    let user =  await userModel.findOne({email: email});
    
    if(user){
        req.flash("error", "Aleady have an account, Please login")
        res.redirect("/"); 
    } 
    else if(fullname.length < 3 || email==0 || password==0 ){
        req.flash("error", "Please enter valid name, email and password")
        res.redirect("/"); 
    }
    else{
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
                    // let token = jwt.sign({email, id: user._id}, "secret");
                    // res.cookie("token", token);
                    req.flash("error", "User created successfully")
                    res.redirect("/"); 

                }
            })
        })
    }

    

});

router.post("/login", async function(req,res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    let owner = await ownerModel.findOne({email: email});
    let products = await productModel.find();


    if(!user){
        req.flash("error", "Email or password incorrect")
        res.redirect("/"); 
    } 
    
    else{

        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                let token = jwt.sign({email, id: user._id}, "secret", { expiresIn: "1h" } );
                res.cookie("token", token);
          
                if(owner){
                    res.redirect("/ownershop");
                }
                else{
                    res.redirect("/shop");
                }
            }
            else{
                req.flash("error", "Email or password incorrect")
                res.redirect("/"); 
            }
        })
        
    }

});

router.get("/logout", async function(req,res){
            res.cookie("token", "");
            res.redirect("/");
});


module.exports =  router;

