const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var medicSchema = new Schema({
  name: { 
    type: String ,
    required: true
  },
  speciality: {
    type: String,
    required: true 
  },
  rating: {
    type: Array
  }
});

module.exports = mongoose.model('Medic', medicSchema);
