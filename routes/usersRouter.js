const express = require('express');
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const multer = require('multer');

// Configure Multer for in-memory file storage
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
});

// Register route
router.post("/register", async function (req, res) {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
        req.flash("error", "Already have an account. Please login.");
        return res.redirect("/");
    } 
    else if (fullname.length < 3 || !email || !password) {
        req.flash("error", "Please enter valid name, email, and password.");
        return res.redirect("/");
    } 
    else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await userModel.create({ fullname, email, password: hash });

            req.flash("success", "User created successfully.");
            res.redirect("/");
        } catch (err) {
            req.flash("error", "Failed to register user.");
            res.redirect("/");
        }
    }
});

// Login route
router.post("/login", async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    let owner = await ownerModel.findOne({ email: email });

    if (!user && !owner) {
        req.flash("error", "Email or password incorrect.");
        return res.redirect("/");
    }
    
    // console.log("owner1");
    try {
        // const match1 = await bcrypt.compare(password, user.password);
        let match2;
        if(owner){
            match2 = await bcrypt.compare(password, owner.password);
        }
        if(user){
            match2 = await bcrypt.compare(password, user.password);
        }
        if (match2) {
            if(owner){
                const token = jwt.sign({ email, id: owner._id }, "secret", { expiresIn: "1h" });
                res.cookie("token", token);
            }
            if(user){
                const token = jwt.sign({ email, id: user._id }, "secret", { expiresIn: "1h" });
                res.cookie("token", token);
            }
            if (owner) {
                return res.redirect("/ownershop");
            } else {
                return res.redirect("/shop");
            }
        } else {
            req.flash("error", "Email or password incorrect.");
            res.redirect("/");
        }
    } catch (err) {
        req.flash("error", "Failed to login.");
        res.redirect("/");
    }
});

// Logout route
router.get("/logout", async function (req, res) {
    res.cookie("token", "");
    // req.flash("error", "Failed to login.");
    res.redirect("/");
});

// Upload Profile Picture
router.post("/upload-profile-picture", isLoggedin, upload.single('profileimage'), async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/account");
        }

        if (!req.file) {
            req.flash("error", "Please upload a valid image file.");
            return res.redirect("/account");
        }

        const base64Image = req.file.buffer.toString('base64');
        user.picture = base64Image;
        await user.save();

        req.flash("success", "Profile picture uploaded successfully.");
        res.redirect("/account");
    } catch (err) {
        req.flash("error", "Error uploading profile picture.");
        res.redirect("/account");
    }
});

module.exports = router;
