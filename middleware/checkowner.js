const ownerModel = require("../models/owner-model")


async function checkOwner(req, res, next) {
    console.log(req.email);
    let owner = true;
    // let owner = await ownerModel.findOne({email: req.session.email})
    console.log(owner);
    if (!owner) {
        return res.send('no-access');  // If not an owner, redirect to an error or no-access page
    }
    next();  // If the user is an owner, proceed to the next middleware
}

module.exports = { checkOwner };