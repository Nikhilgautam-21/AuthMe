var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    username :{
        type : String,
        required : true,
        trim : true
    },
    salt :{
        type : String,
        required : true
    },
    hash :{
        type : String,
        required : true
    }
});

var User  = mongoose.model('User', UserSchema);
module.exports = User;