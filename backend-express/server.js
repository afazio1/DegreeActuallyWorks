const express = require('express');
const mongoose = require('mongoose');
const connectDB = require("./config/db.js");
const app = express();

connectDB();

const Course = require("./models/course");

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/senduserdata", (req, res) => {
    let a = req.body.name;
    res.send(a);
});
app.get("/courses/:user_id", async(req, res) => {
  const courses = await Course 
});




const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if(err){return console.log(err);} 
  console.log("Express Server listening on port " + port);
});
