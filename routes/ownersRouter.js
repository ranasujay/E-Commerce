const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owner-model");
const isLoggedin = require("../middleware/isLoggedin");





router.get("/ownercreate", async function(req,res){
    let owners = await ownerModel.find();
    if(owners.length > 0){
        res.status(404).send("Access Denied");
    }
    else{

        res.render("./ownerspages/createowner", {error:""});    
    }
});


router.post("/create", async function(req,res){


    let { fullname, email, password } = req.body;

    let user = await ownerModel.findOne({ email: email });
    if (user) {
        req.flash("error", "Already have an account. Please login.");
        return res.redirect("/owners/ownercreate");
    } 
    else if (fullname.length < 3 || !email || !password) {
        req.flash("error", "Please enter valid name, email, and password.");
        return res.redirect("/owners/ownercreate");
    } 
    else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await ownerModel.create({ fullname, email, password: hash });

            req.flash("success", "Owner created successfully.");
            res.redirect("/");
        } catch (err) {
            req.flash("error", "Failed to register Owner.");
            res.redirect("/owners/ownercreate");
        }
    }
   


});

 router.get("/admin",isLoggedin, async function(req,res){
    let user = req.user;
    let user_email = user.email;
    let owner = await ownerModel.findOne({email: user_email});
    if(!owner){
        res.status(404).send("Access Denied");
    }
    res.render("./ownerspages/createproduct");
 });

// router.get("/", function(req,res){
//     res.send("hey it is working");
// });

module.exports =  router;

