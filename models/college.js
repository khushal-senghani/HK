const mongoose = require('mongoose');



// SCHEMA 
var collegeSchema = new mongoose.Schema({
    name: String,
    licensce: String,
    password : String
});
var College  = mongoose.model("College", collegeSchema);


module.exports = College;