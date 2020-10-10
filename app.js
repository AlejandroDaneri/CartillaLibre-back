const express = require('express');

const app = express();

const PORT = 4000;

app.get('/ping',(req,res) =>{
  res.status(200).json("Ping")
})

const server = app.listen(PORT,()=>{
  console.log("Listen in port:", PORT)
})

module.exports = server
