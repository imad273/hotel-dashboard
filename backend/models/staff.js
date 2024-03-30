const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  position: String,
  phoneNumber: String,
  email: String,
  address: String
}, { collection: 'staff' });

const Staff = mongoose.model('Staff', staffSchema)

module.exports = Staff