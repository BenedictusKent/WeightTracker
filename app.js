const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// set static files
app.use(express.static(__dirname + "/views"));

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
    res.render("index");
});
