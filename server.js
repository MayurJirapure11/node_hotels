const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.get("/", function (req, res) {
  res.send("Welcome Sir");
});

const personRoutes = require('./routes/personRoutes.js')
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoutes.js')
app.use('/menu',menuRoutes)

//for testing

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
