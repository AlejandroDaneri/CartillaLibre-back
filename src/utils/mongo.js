require('dotenv').config()
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

mongoose.connect(process.env.DATABASE_URL, options).
  then( function() {
    console.log('MongoDB is connected');
  })
  .catch( function(err) {
    console.error(err);
  });
