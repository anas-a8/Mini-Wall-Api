const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  unique: true,
  required: true,
 },
 password: {
  type: String,
  required: true,
 }
});

module.exports = mongoose.model('User', UserSchema);