require('dotenv').config()
const express = require('express');
var cors = require('cors')
const app = express();
const routes = require('./src/api/routes')

app.use(express.json())

app.use(cors())
app.use('/', routes)

const server = app.listen(process.env.PORT,()=>{
  console.log("Listen in port:", process.env.PORT)
})

module.exports = server
