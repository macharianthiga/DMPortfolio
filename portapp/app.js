
var express            = require("express"),
app                    = express(),
bodyParser             = require("body-parser"),
mongoose               = require("mongoose"),
passport               = require("passport"),
Project                = require("./models/index"),
methodOverride         = require("method-override"),
localStrategy          = require("passport-local");

//use the packages
mongoose.connect("mongodb://localhost/portdb1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//creating my projects
// Project.create({
//     image: "./images/03.png",
//     name: "Zilla Paper",
//     description: "A creative freelance writing platform"
// }, function(err, project){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("newly created project");
//         console.log(project);
//     } 
// });

//Routes
        //index root
app.get("/", function(req, res){
   res.render("index") ;
});

 //start the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The portfolio server has started"); 
});


