const crypto = require('crypto');
const User = require('./models/user');

var generateRandom = (length) =>{
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length)
}

const createHash = (pass, salt) =>{
    var hash = crypto.createHmac('sha512',salt);
    var value = hash.update(pass).digest('hex');
    return{
        salt : salt,
        hash : value
    } 
}

const compareHash = (pass,salt,hash) => {
    if(createHash(pass, salt).hash == hash){
        return true
    }
    else{
        return false
    }
}

module.exports = {
    createHash: createHash,
    compareHash: compareHash,
    generateRandom: generateRandom
  }
  