const express = require('express');

const app = express();

const PORT = 3000;

app.get('/',(req,res) =>{
  res.status(200).send("Ping")
})

app.listen(PORT,()=>{
  console.log("Escuchando en el puerto", PORT)
})
