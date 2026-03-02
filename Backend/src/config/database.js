const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectDB;