const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique for each user
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['employee', 'employer'], // You can expand this list based on your use case
    default: 'employee', // Default role is 'employee' (can be changed as per requirements)
  },
});

module.exports = mongoose.model('User', userSchema);
