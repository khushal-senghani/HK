const express = require('express');
const router = express.Router();
const login = require("../models/login");
const bcrypt = require('bcrypt');
const passport = require('passport');


var name,
    email,
    password,
    password2;


//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/signup/new',(req,res)=>{
    res.render('signup.ejs')
    })
//Register handle
router.post('/login/continue',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/broucher',
    failureRedirect: '/',
    failureFlash : true
})(req,res,next)
});
  //register post handle
  router.post('/signup',(req,res)=>{
    // req.body(name, email, password, password2) =  (name, email, password, password2);
   var name = req.body.name;
   var email = req.body.email;
   var password = req.body.password;
   var password2 = req.body.password2;
    
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
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
    res.render('signup', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
     } else {
        //validation passed
        Pravesh.logins.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('signup',{errors,name,email,password,password2})  
           } else {
            const newLogin = new Login.student({
                name : name,
                email : email,
                password : password
            });
    
            //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newLogin.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newLogin.password = hash;
                    //save user
                    newLogin.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','You have now registered!');
                        res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             }
       }) 
    }
    })
//logout
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','Now logged out');
res.redirect('/users/login'); 
})
module.exports  = router;