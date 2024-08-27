const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");


mongoose
.connect("mongodb://127.0.0.1/E-commerce")
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})
module.exports = mongoose.connection;