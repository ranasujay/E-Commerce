const express = require('express');
const router = express.Router();



module.exports = async function(req,res,next) {
    // return res.redirect('/');
    // return true;
    next();
}

