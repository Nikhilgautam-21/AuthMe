const jwt = require('jsonwebtoken');
const config = require('./config.js')

var checkToken = (req, res, next) =>{
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer')){
        token = token.slice(7,token.length)
    }

    if(token){
        jwt.verify(token, config.secret,(err,decoded) =>{
            if(err){
                return res.json({
                    success: false,
                    message: "Token is Invalid"
                })
            }
            else{
                req.decoded = decoded;
                res.json({
                    success:true
                })
                next();
            }
        })
    }else{
        return res.json({
            success: false,
            message: 'Auth token not supplied'
        })
    }
};

module.exports = {
    checkToken: checkToken
  }
  