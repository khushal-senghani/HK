const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const bodyParser = require("body-parser");
const Localstrategy = require("passport-local");
const passportLocalMongooose = require("passport-local-mongoose");


app.use(express.urlencoded({extended : true}));


//passport config:
// require('./config/passport')(passport);
// require('./config/passport1')(passport);

//EJS
app.set('view engine','ejs');

//app.use(expressEjsLayout);  

//MongoDB connect
mongoose.connect('mongodb+srv://cluster0.yuj1k.mongodb.net/project?retryWrites=true&w=majority',
 {  
    dbName : 'Pravesh',
    user : 'nipa',
    pass : '7666913909',
    useUnifiedTopology : true,
    useNewUrlParser : true})
    .then(() => {
    console.log('MongoDB Connected');
});

// app.use(require("express-session")({
//     secret : 'secret',
//     resave : false,
//     saveUninitialized : false
// }))


// app.use(session({
//     secret : 'secret',
//     resave : true,
//     saveUninitialized : true
// }));


// passport.serializeUser(User.serializeUser);
// passport.deserializeUser(User.deserializeUser);

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use((req,res,next)=> {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error  = req.flash('error');
//     next();
//     });



app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/clg',require('./routes/clg'));





// module.exports = College;

app.listen(3000, function(){
    console.log("Server has started");
});