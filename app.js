require('dotenv').config()
const express = require('express');
const app = express();

app.get('/ping',(req,res) =>{
  res.status(200).json("Ping")
})

app.get('/',(req,res) =>{
  res.status(200).json("Welcome")
})


const server = app.listen(process.env.PORT,()=>{
  console.log("Listen in port:", process.env.PORT)
})

module.exports = server
