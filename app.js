require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./src/api/routes')

app.use(express.json())

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} ${req.params.id}`)
  if (Object.keys(req.body).length !== 0) {
    console.table(req.body)
  }
  next()
})

app.use('/', routes)

const server = app.listen(process.env.PORT,()=>{
  console.log("Listen in port:", process.env.PORT)
})

module.exports = server
