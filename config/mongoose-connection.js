const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } );
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.error(err);
    }
  };

module.exports = connectDB;