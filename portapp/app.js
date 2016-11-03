
var express            = require("express"),
app                    = express(),
bodyParser             = require("body-parser"),
mongoose               = require("mongoose"),
passport               = require("passport"),
flash                  = require("connect-flash"),
Project                = require("./models/index"),
User                   = require("./models/user"),
methodOverride         = require("method-override"),
allRoutes                 = require("./routes/routes"),
localStrategy          = require("passport-local");

//use the packages
mongoose.connect("mongodb://localhost/portdb1");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash());


app.use(require("express-session")({
    secret: "What's your secret?",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.use(function(req,res,next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(allRoutes);

//creating my projects
// Project.create(
//     {image: "./images/01.png", name: "WeCustomwrite", stack:"PHP", url:"http://wecustomwrite.com/", description: "A creative freelance writing platform"},
//     {image: "./images/02.png", name: "Phantom Project",stack:"Ruby on Rails", url:"http://www.phantomproject.co.uk/", description: "Men's watch e-commerce store"},
//     {image: "./images/03.png", name: "Hey Shabby Me", stack:"Rails", url:"https://heyshabbyme.com/", description: "Ceramic mugs and Clothing ecommerce store"},
//     {image: "./images/04.png", name: "Zilla Paper", stack:"PHP(Laravel)", url:"http://zillapaper.com/", description: "Creative writing platform"},
//     {image: "./images/05.png", name: "Agrinnov Kenya", stack:"Plain HTML & JS", url:"http://agrinnovkenya.co.ke/", description: "Agricultural exports website"},
//     {image: "./images/06.png", name: "Shazzi Gallery",  stack:"Node Js", url:"Pending Deployment", description: "A simple personal photography gallery"},
//     {image: "./images/07.png", name: "Embark.org", stack:"PHP", url:"http://www.embark.org/",  description: "Adventure sharing platform"},
//     {image: "./images/08.png", name: "Heroic Imagination", stack:"Node Js", url:"http://heroicimagination.org/london-event", description: "A simple event website for HIP"},
//     {image: "./images/09.png", name: "Travella", stack:"iOS 10 & Swift 3", url:"Pending Deployment", description: "An ongoing exclusive travel app"},
//     {image: "./images/10.png", name: "DevClad", stack:"iOS 10 & Swift 3", url:"Pending Deployment", description: "Ongoing-Confidential"},
//     {image: "./images/11.png", name: "Confidential", stack:"Go Lang", url:"Pending Deployment", description: "Details after launch"},
//     {image: "./images/12.png", name: "Confidential", stack:"Node Js", url:"Pending Deployment", description: "Details will be available after launch"},
//     function(err, project){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("newly created project");
//         console.log(project);
//     } 
// });



 //start the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The portfolio server has started"); 
});


