const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  position: Number,
  phoneNumber: Number,
  email: String,
  address: Boolean
}, { collection: 'staff' });

const Staff = mongoose.model('Staff', staffSchema)

module.exports = Staff