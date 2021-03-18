const mongoose = require('mongoose');
const passportLocalMongooose = require("passport-local-mongoose");

const UserSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,
date :{
    type : Date,
    default : Date.now
}
});

UserSchema.plugin(passportLocalMongooose);

const User= mongoose.model('User',UserSchema);

module.exports = User;