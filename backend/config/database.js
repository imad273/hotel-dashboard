const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connected Successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

module.exports = connectDB;