const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/senduserdata", (req, res) => {
    let a = req.body.name;
    res.send(a);
});





const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if(err){return console.log(err);} 
  console.log("Express Server listening on port " + port);
});