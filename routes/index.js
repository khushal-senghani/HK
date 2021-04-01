const express = require('express');
// const College = require("../app");
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const College_form = require("../models/clgform");

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended : true}));

//homepage
router.get("/",function(req, res){
    res.render('homepage.ejs');
});

router.get("/homepagelogin",function(req, res){
    res.render('homepagelogin.ejs');
});

router.get("/hompageregister",function(req, res){
    res.render('homepageregister.ejs');
});


//         STUDENTS SIDE      

//sign up
router.get("/signup",function(req, res){
    res.render('signup.ejs');
});

//student login
// router.get("/studentLogin",function(req, res){
//     res.render('login.ejs');
// });

//doc upload
router.get("/stundentdetailsform",function(req, res){
    res.render("studentform.ejs");
});
router.get("/stundentform",function(req, res){
    res.render("studentviewform.ejs");
});
//broucher
router.get("/broucher",function(req, res){
    // Get all college from DB
    College_form.find({}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.render("broucher.ejs", {data : data});
            }
        });
});

//student profile
router.get("/studentdashboard", function(req, res){
    res.render("studentdashboard.ejs");
});




//settings
router.get("/settings",function(req, res){
    res.render("settings.ejs");
});// Create more routes for specific settigs



//clg admission form
router.get("/clgaddmissionform",function(req, res){
    res.render("")
});

//college details
router.get("/collegedetails",function(req, res){
    res.render("collegedetailform.ejs");
});

router.post('/collegedetails/upload',function(req, res){
    // console.log(req.body);
    // var licensce = req.body.licensce;
    // var college_name = req.body.college_name;
    // var college_logo = req.body.college_logo;
    // var facilities = req.body.facilities;
    // var facilities_img = req.body.facilities_img;
    // var campus = req.body.campus;


    var myData = new College_form(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database" + err);
    });

});

//my applications
router.get("/applicationstatus",function(req, res){
    res.render("applicationstatus.ejs");
});//Create Extra feature(Track record), pay now button

router.get("/paymentgateway",function(req, res){
    res.render("paymentgateway.ejs");
});







//            COLLEGE SIDE


//registration






// router.post("/register",function(req, res){
//     // //Get Data from the college register
//     // var name = req.body.name;
//     // var email = req.body.email;
//     // var newCollege = {name : name, email : email};
//     // //Add to the db
//     // College.create(newCollege, function(err, newlyCreated){
//     //     if(err){
//     //         console.log(err);
//     //     } else {
//     //         //redirect to the college template to prevview the data added
//     //         res.redirect("/ClgDashboard");
//     //     }
//     // });

// });

//clg template
router.get("/clgtemplate/605ccea5a9817e0f50649691", function(req, res){
    // College_form.find({}, function(err, result) {
    //     res.send(result[0]._id);
       
    // });

    College_form.findOne({_id : "605ccea5a9817e0f50649691" }, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.render("clgtemplate.ejs", {data : data});
            }
        });
});

//clgnew  template
router.post("/clgtemplate", function(req, res){
    res.render("");
});


//clg login
router.get("/clgLogin",function(req, res){
    res.render('clgLogin.ejs');
});


router.get("/ClgDashboard",function(req, res){
    res.render("Clgdashboard.ejs");
});

//student applications
router.get("/studentapplication",function(req, res){
    res.send("student applications!!");
});


//programm registration
 router.get("/programRegistration/new",function(req, res){
    res.render("pr.ejs");
 });

router.post("/programRegistration",function(req, res){
    //  //Get Data from the college register
    //  var id = _id;
    //  console.log(id);
    //  var pr_name = req.body.pr_name;
    //  var time_period = req.body.time_period;
    //  var fees = req.body.fees;
    //  var newCollege = {pr_name : pr_name, time_period : time_period, fees : fees};
    //  //Add to the db
    //  College.create(newCollege, function(err, newlyCreated){
    //      if(err){
    //          console.log(err);
    //      } else {
    //          //redirect to the college template to prevview the data added
    //          res.redirect("/ClgDashboard");
    //      }
    //  });
});

//sign up
// router.get("/signup",function(req, res){
//     res.send("signup page!!");
// });


//clg Settings
router.get("/clgSettings",function(req, res){
    res.send("clg Settings page!!");
});//create more routes for specific settings

router.get("/applications", function(req, res){
    res.render("applications.ejs");
});

//Admin Side
router.get("/adminLogin",function(req, res){
    res.render('adminLogin.ejs');
})


router.get("/admindashboard",function(req, res){
    res.render('admindashboard.ejs');
})

router.get("/adminverification",function(req, res){
    res.render('adminverification.ejs');
})


router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });





router.get('*', function (req, res){
    res.send("404 Error")
});





module.exports = router; 