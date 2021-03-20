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
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');


app.use(express.urlencoded({extended : true}));


//passport config:
// require('./config/passport')(passport);
// require('./config/passport1')(passport);

//EJS
app.set('view engine','ejs');

//app.use(expressEjsLayout);  

//MongoDB connect
mongoURI = "mongodb+srv://cluster0.yuj1k.mongodb.net/project?retryWrites=true&w=majority"
// const conn = mongoose.createConnection(mongoURI);
mongoose.connect(mongoURI,
 {  
    dbName : 'Pravesh',
    user : 'nipa',
    pass : '7666913909',
    useUnifiedTopology : true,
    useNewUrlParser : true})
    .then(() => {
    console.log('MongoDB Connected');
});


// // Middleware
// app.use(bodyParser.json());
// app.use(methodOverride('_method'));
// app.set('view engine', 'ejs');

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

// // Init gfs
// let gfs;

// mongoose.connection.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('clgform');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'clgform'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });


app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/clg',require('./routes/clg'));
app.use('/form', require('./routes/form')); 


  

// module.exports = conn;
module.exports = mongoURI;

app.listen(3000, function(){
    console.log("Server has started");
});