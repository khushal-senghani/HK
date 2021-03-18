const User = require('../models/user');
const College = require('../models/college');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


module.exports = function(passport1){
    passport1.use(
        new LocalStrategy({usernameField: 'licensce'},(licensce,password,done)=>{
            //match user
    College.findOne({licensce:licensce})
            .then((user)=>{
                if(!user){
                    return done(null,false,{message:'email not registered'});
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'password incorrect'});
                    }
                })
            })
            .catch((err)=>{console.log(err)})
        })
    )
    passport1.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport1.deserializeUser(function(id,done){
        College.findById(id,function(err,user){
            done(err,user);
        })
    })
}