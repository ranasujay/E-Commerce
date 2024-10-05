const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");
const session = require('express-session');
const flash = require('connect-flash');



// const userModel = require("./models/user");
// const postModel = require("./models/post");

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }));
  
  // Initialize connect-flash
  app.use(flash());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);