const User = require('../models/user')
const express=  require('express');;

const jwt = require('jsonwebtoken');
const config = require('../config.js');
const middleware = require('../middleware');
const crypt = require('../crypt');

const router = express.Router(); 

router.post('/signup',function(req,res){
    if(req.body.email && req.body.username && req.body.password) {
        salt = crypt.generateRandom(req.body.password.length)
        pass = crypt.createHash(req.body.password,salt)
        var UserData = {
            email: req.body.email,
            username: req.body.username,
            salt: pass.salt,
            hash: pass.hash
        }
        User.create(UserData, function(err,user){
            if(err){
                res.json({
                    success:false,
                    message: "Can't sign up right now"
                })
            }
            else{
                return res.json({
                    success:true,
                    message:"User Created Successfully "+ user.username})
            }
        });
    }
})

router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    if(email && password){
        User.findOne({email:email},function(err,obj){
            if(obj){
                if(crypt.compareHash(password,obj.salt,obj.hash)){
                    var token = jwt.sign({email:email},config.secret,{expiresIn:'24h'});
                    res.json({
                        success: true,
                        message: 'Authentication Succesful',
                        token: token
                    });
                }
                else{
                    res.json({
                        success:false,
                        message: "Invalid Username or Password",
                    })
                }
            }
            else{
                res.json({
                    success:false,
                    message:"No user found"
                })
            }
        });

    }else{
        res.send(400).json({
            success: false,
            message: 'Authentication failed'
        })
    }
});

router.get('/auth/home', middleware.checkToken) 

module.exports = router;