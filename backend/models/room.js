const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: String,
  price: Number,
  capacity: Number,
  description: String,
  availability: Boolean,
  images: [Object]
}, { collection: 'rooms' });

const Room = mongoose.model('Room', roomSchema)

module.exports = Room