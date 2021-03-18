const mongoose = require('mongoose');



// SCHEMA 
var loginSchema = new mongoose.Schema({
    student : {
        name :{
            type  : String,
            // required : true
        } ,
        email :{
          type  : String,
          // required : true
      } ,
        password :{
          type  : String,
          // required : true
      } ,
    },

    college : {
        name :{
            type  : String,
            // required : true
        } ,
        licensce :{
          type  : String,
          // required : true
      } ,
        password :{
          type  : String,
          // required : true
      } 
    },

    admin : {
        name :{
            type  : String,
            // required : true
        } ,
        email :{
          type  : String,
          // required : true
      } ,
        password :{
          type  : String,
          // required : true
      }
    }
});
var Login  = mongoose.model("Login", loginSchema);

Login.create({college : {
  name : "Somaiya",
  licensce : "1234",
  password : "1234567"
}})
module.exports = Login;