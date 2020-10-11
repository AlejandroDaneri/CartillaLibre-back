require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./src/api/routes')

app.use('/', routes)

const server = app.listen(process.env.PORT,()=>{
  console.log("Listen in port:", process.env.PORT)
})


module.exports = server
