const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: String, // String is shorthand for {type: String}
  price: Number,
  capacity: Number,
  description: String,
  images: [Object]
}, { collection: 'rooms' });

const Room = mongoose.model('Room', roomSchema)

module.exports = Room