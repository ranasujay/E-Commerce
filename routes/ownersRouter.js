const express = require('express');
const router = express.Router();
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


    let {fullname, email, password} =  req.body;   
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    
    });
    res.status(203).send(createdOwner);
   


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

