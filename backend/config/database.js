const mongoose = require('mongoose');

const uri = 'mongodb://emad:AsMYmldS8ZONDGm0@ac-dpo5vm7-shard-00-00.hqxfwkj.mongodb.net:27017,ac-dpo5vm7-shard-00-01.hqxfwkj.mongodb.net:27017,ac-dpo5vm7-shard-00-02.hqxfwkj.mongodb.net:27017/hotel_app?replicaSet=atlas-5uuok6-shard-0&ssl=true&authSource=admin';

const connectDB = mongoose.connect(uri)
  .then(() => {
    console.log('Database connected Successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

module.exports = connectDB;