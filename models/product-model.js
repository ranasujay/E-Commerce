const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1/E-commerce");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    discout: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panlecolor: String,
    textcolor: String,
    image: String
})

module.exports = mongoose.model("product",productSchema);