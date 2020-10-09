const express = require('express');

const app = express();

const PORT = 3000;

app.get('/ping',(req,res) =>{
  res.status(200).json("Ping")
})

const server = app.listen(PORT,()=>{
  console.log("Listen in port:", PORT)
})

module.exports = server
