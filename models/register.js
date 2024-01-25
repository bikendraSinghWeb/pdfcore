const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  // encode 
  password: {
    type: String,
    require: true,
  },
  referralId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'referral',
  }],
  token:{
    type: String,
  },
  passwordResetToken:{
    type: String,
  }
  
});

module.exports = mongoose.model('registers', schema);
