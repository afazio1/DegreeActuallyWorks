const express = require("express");
const connectDB = require('./config/db');
const app = express();
const port = 8000;

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

