const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

// listen for requests
app.listen(3000);

// Create DB connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});
