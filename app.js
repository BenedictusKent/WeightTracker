const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});
