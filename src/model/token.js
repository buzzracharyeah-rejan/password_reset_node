const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'user id required'],
    ref: 'user',
  },
  token: {
    type: String,
    required: [true, 'token required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // expires in 1hr
  },
});

const Token = mongoose.model('Token', Schema);
module.exports = Token;
