const express = require('express');
const router = express.Router();
const Login = require("../models/login");
const bcrypt = require('bcrypt');
const passport = require('passport');

var name,
    licensce,
    password,
    password2;



//login handle
router.get('/clglogin',(req,res)=>{
    res.render('clgLogin.ejs');
})
router.get("/register/new",function(req, res){
    res.render("register.ejs");
});
//Register handle
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/ClgDashboard',
    failureRedirect: '/',
    failureFlash : true
})(req,res,next)
})
  //register post handle
  router.post('/register',(req,res)=>{
    // req.body(name, email, password, password2) =  (name, email, password, password2);
   var name = req.body.name;
   var licensce = req.body.licensce;
   var password = req.body.password;
   var password2 = req.body.password2;
    
    let errors = [];
    console.log(' Name ' + name+ ' licensce :' + licensce+ ' pass:' + password);
    if(!name || !licensce || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        licensce : licensce,
        password : password,
        password2 : password2})
     } else {
        //validation passed
       Pravesh.logins.findOne({college : {licensce : licensce}}).exec((err,user)=>{
        //console.log(user);   
        if(user) {
            errors.push({msg: 'Licensce already registered'});
            res.render('register',{errors,name,licensce,password,password2})  
           } else {
            const newLogin = new Login({college : {
                name : name,
                licensce : licensce,
                password : password
            }});
    
            //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newLogin.password,salt,
                (err,hash)=> {
                    console.log(newLogin.password);
                    if(err) throw err;
                        //save pass to hash
                        newLogin.password = hash;
                    //save user
                    newLogin.save()
                    .then((value)=>{
                        
                        req.flash('success_msg','You have now registered!');
                        res.redirect('/clg/clglogin');
                    })
                    // .catch(value=> console.log(value));
                      
                }));
             }
       }) 
    }
    })
//logout
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/clg/clglogin'); 
})

module.exports  = router;