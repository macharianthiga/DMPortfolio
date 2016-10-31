
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
// Project.create(
//     {image: "./images/01.png", name: "WeCustomwrite",description: "A creative freelance writing platform"},
//     {image: "./images/02.png", name: "Phantom Project",description: "Men's watch e-commerce store"},
//     {image: "./images/03.png", name: "Hey Shabby Me", description: "Ceramic mugs and Clothing ecommerce store"},
//     {image: "./images/04.png", name: "Zilla Paper",description: "Creative writing platform"},
//     {image: "./images/05.png", name: "Agrinnov Kenya",description: "Agricultural exports website"},
//     {image: "./images/06.png", name: "Shazzi Gallery",description: "A simple personal photography gallery"},
//     {image: "./images/07.png", name: "Embark.org",description: "Adventure sharing platform"},
//     {image: "./images/08.png", name: "Heroic Imagination",description: "A simple event website for HIP"},
//     {image: "./images/09.png", name: "Travella",description: "An ongoing exclusive travel app"},
//     {image: "./images/10.png", name: "DevClad",description: "Ongoing-Confidential"},
//     {image: "./images/11.png", name: "Confidential",description: "Details after launch"},
//     {image: "./images/12.png", name: "Confidential",description: "Details will be available after launch"},
//     function(err, project){
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
    //get all projects from the database
    Project.find({}, function(err, allProjects){
        if(err){
            console.log(err);
        } else{
            res.render("index", {projects: allProjects});
            
        }
    });
    
});

 //start the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The portfolio server has started"); 
});


