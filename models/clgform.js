const mongoose = require('mongoose');



// SCHEMA 
var clgformSchema = new mongoose.Schema({
    // name: String,
    // licensce: String,
    // password : String,

    Licensce: String,
    college_name: String,
    college_logo: String,
    facilities: String,
    facilities_img: Array,
    campus: String,
    campus_img: Array,
    alumini: String,
    alumini_img: String,
    address: String,
    phone: String,
    email: String,
    programm : Array
});
var College_form  = mongoose.model("College_form", clgformSchema);


module.exports = College_form;