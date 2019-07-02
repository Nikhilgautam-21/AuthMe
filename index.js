const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
var routes = require('./routes/auth.js')
const ejs = require('ejs')
const PORT = 8200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

mongoose.connect('mongodb://localhost/authenticateMe',{useNewUrlParser:true});
mongoose.Promise =global.Promise;
mongoose.set('useCreateIndex', true)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, OPTIONS, PUT');
    next();
});

app.use('/api',routes);
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home')
})
app.get('/signup',function(req,res){
    res.render('signup')
})

app.listen(PORT, function(){
    console.log("Listening to Port "+PORT);
})
