"use strict";

const fs = require("fs");
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

// Connect to DB
connection.connect((err) => {
    if (err) throw err;
    else {
        connection.query(
            `CREATE TABLE IF NOT EXISTS weight_data (
                date DATE PRIMARY KEY,
                weight FLOAT NOT NULL
            );`,
            (err, result) => {
                if (err) throw err;
                else console.log("Connected to MySQL server");
            }
        );
    }
});

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Get table data
app.get("/data", (req, res) => {
    const dateArray = [];
    const weightArray = [];

    const selectQuery = `SELECT * FROM weight_data`;
    connection.query(selectQuery, (err, result) => {
        if (err) throw err;
        // Loop through all table data
        for (let i = 0; i < result.length; i++) {
            // Change {2023-03-31T16:00:00.000Z} -> {2023-04-01}
            const date = new Date(result[i]["date"]);
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;
            dateArray.push(dateString);
            weightArray.push(result[i]["weight"]);
        }
        const data = {
            dates: dateArray,
            weight: weightArray,
        };
        res.json(data);
    });
});

// Insert or update data
app.post("/", (req, res) => {
    const { calendar, weight } = req.body;

    // function to update table when data exists
    function updateTable(dateToChange, weightToChange) {
        const updateQuery = `UPDATE weight_data SET weight = ${weightToChange} WHERE date = '${dateToChange}' `;
        connection.query(updateQuery, (err, result) => {
            if (err) throw err;
            console.log("Data updated");
        });
    }

    // function to insert data when data NOT exists
    function insertTable(dateToInsert, weightToInsert) {
        const insertQuery = `INSERT INTO weight_data (date, weight) VALUES ('${dateToInsert}', ${weightToInsert})`;
        connection.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log("Data inserted");
        });
    }

    // Check if same date exists in table
    var dataExists = false;
    const selectQuery = `SELECT * FROM weight_data`;
    connection.query(selectQuery, (err, result) => {
        if (err) throw err;
        // Loop through all table data
        for (let i = 0; i < result.length; i++) {
            // Change {2023-03-31T16:00:00.000Z} -> {2023-04-01}
            const date = new Date(result[i]["date"]);
            const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;
            // If date already exist in table, need to update
            if (dateString === calendar) {
                dataExists = true;
                updateTable(calendar, weight);
                break;
            }
        }
        // If data doesn't exist, insert to table
        if (!dataExists) insertTable(calendar, weight);
    });

    res.redirect("/");
});
