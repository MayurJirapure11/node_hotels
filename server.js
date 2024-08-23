const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config()

const passport = require('./auth.js')

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false}) ;
app.get("/", function (req, res) {
  res.send("Welcome Sir");
});

const personRoutes = require('./routes/personRoutes.js')
app.use('/person',localAuthMiddleware,personRoutes)

const menuRoutes = require('./routes/menuRoutes.js')
app.use('/menu',menuRoutes)

//for testing

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
