const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const crypto = require('crypto');
const GridFs = require('gridfs-stream');
const express = require('express');
const router = express.Router();
const conn = require('../app.js')

//init gridfs
let gfs;

mongoose.connection.once('open', function () {
    //INIT Stream
    const gfs = Grid(mongoose.db, mongoose.mongo);
    gfs.collection('uploads');
});

//create stoarage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });




//college details
router.get("/collegedetails",function(req, res){
    res.render("temp.ejs");
});

router.post('/collegedetails/upload', upload.single('file'), function(req, res){
    res.json({file : req.file});
});


module.exports = router;