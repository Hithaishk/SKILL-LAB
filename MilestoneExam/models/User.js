
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:{type:String , required:true,unique:true},
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // subscribed: { type: Boolean, default: false },
},{ collection: 'User' });

const User = mongoose.model('User', userSchema);

module.exports = User;
