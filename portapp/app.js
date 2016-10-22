
var express            = require("express"),
app                    = express(),
bodyParser             = require("body-parser"),
mongoose               = require("mongoose"),
passport               = require("passport"),
methodOverride         = require("method-override"),
localStrategy          = require("passport-local");

//use the packages
mongoose.connect("mongodb://localhost/portdb1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//Routes

 //start the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The portfolio server has started"); 
});


