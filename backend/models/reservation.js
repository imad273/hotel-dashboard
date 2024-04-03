const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  room: Object,
  guestName: String,
  phoneNumber: String,
  email: String,
  guestsNumber: String,
  checkIn: Number,
  checkOut: Number,
  cost: Number,
  paymentStatus: Boolean,
  notes: String,
}, { collection: 'reservations' });

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation