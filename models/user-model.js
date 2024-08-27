const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1/E-commerce");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    contact: Number,
    orders: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    picture: String
})

module.exports = mongoose.model("user",userSchema);