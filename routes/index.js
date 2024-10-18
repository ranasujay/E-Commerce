const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");

// Homepage route
router.get("/", async function(req, res) {
    // req.flash("success");
    // req.flash("error");
    res.render("index",{ success: req.flash("success"), error: req.flash("error") });
});

// Shop route with success and error message handling
router.get("/shop", isLoggedin, async function(req, res) {
    try {
        let products = await productModel.find();
        res.render("shop", {
            products: products,
            success: req.flash("success"),
            error: req.flash("error")
        });
    } catch (err) {
        req.flash("error", "Failed to load products.");
        res.redirect("/");
    }
});

// Cart route
router.get("/cart", isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        res.render("cart", { user, success: req.flash("success"), error: req.flash("error") });
    } catch (err) {
        req.flash("error", "Failed to load cart.");
        res.redirect("/shop");
    }
});

// Add to Cart route
router.get("/addtocart/:product_id", isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.product_id);
        await user.save();
        req.flash("success", "Added to cart");
    } catch (err) {
        req.flash("error", "Failed to add item to cart.");
    }
    res.redirect("/shop");
});

// Account route
router.get("/account", isLoggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    res.render("account", {
        fullname: user.fullname,
        email: user.email,
        phone: user.contact,
        profilePicture: user.picture,
        success: req.flash("success"),
        error: req.flash("error")
    });
});

// Owner's Shop route (restricted)
router.get("/ownershop", async function(req, res) {
    // console.log("owner2");
    // let owner = await ownerModel.findOne({ email: req.user.email });
    // if (!owner) {
    //     req.flash("error", "Access Denied. Owner not found.");
    //     return res.redirect("/");
    // }
    let products = await productModel.find();
    res.render("./ownerspages/shop", { products, success: req.flash("success"), error: req.flash("error") });
});

// Owner's Account route (restricted)
router.get("/owneraccount", async function(req, res) {
    // let owner = await ownerModel.findOne({ email: req.user.email });
    // if (!owner) {
    //     req.flash("error", "Access Denied. Owner not found.");
    //     return res.redirect("/");
    // }
    // res.render("ownerspages/account", {
    //     owner: owner,
    //     success: req.flash("success"),
    //     error: req.flash("error")
    // });
    res.redirect("/ownershop");
});

module.exports = router;
