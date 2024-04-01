const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  RoomNumber: String,
  guestName: String,
  phoneNumber: String,
  email: String,
  guestsNumber: String,
  CheckIn: Date,
  CheckOut: Date,
  Cost: Number,
  PaymentMethod: String,
  Notes: String,
}, { collection: 'reservations' });

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation