const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already taken'],

  },

  email:{
    type: String,
    unique: [true, 'Email already registered'],
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },

password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;