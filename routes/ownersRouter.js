const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");



//// error on creating owner????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????

router.get("/create", async function(req,res){

    let owners = await ownerModel.find();

    // console.log(owners.length);
    if(owners.length > 0) res.status(503).send("can't make more owner");
    else{

        let {fullname, email, password} =  req.body;   
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
     
        });
        res.status(203).send(createdOwner);
    }
});

 router.get("/admin", function(req,res){
    res.render("createproduct");
 });

// router.get("/", function(req,res){
//     res.send("hey it is working");
// });

module.exports =  router;

