const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


module.exports = async function(req,res,next) {
    const token = req.cookies.token;

    // Check if the token exists
    if (!token) {
    //   return res.status(401).json({ message: 'Unauthorized: No token provided' });
      return res.status(401).send('Unauthorized: No token provided');
    }
  
    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        // Invalid token
        // return res.status(403).json({ message: 'Invalid token' });
        return res.status(403).send('Invalid token');
      }
  
      // Token is valid, store user info in req object for future use
      req.user = decoded;
  
      // Continue to the next middleware or route
    
    next();
    });
}

