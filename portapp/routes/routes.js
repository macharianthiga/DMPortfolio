var express= require("express");
var router=  express.Router();
var User =   require("../models/user");
var Project= require("../models/index");
var passport= require("passport");


//Routes
        //index root
router.get("/", function(req, res){
    //get all projects from the database
    Project.find({}, function(err, allProjects){
        if(err){
            console.log(err);
        } else{
            res.render("index", {projects: allProjects});
            
        }
    });
    
});

//about me route
router.get("/about", function(req, res){
    res.render("about")
});

//Guest route (Signed in)
router.get("/guest", isLoggedIn, function(req,res){
    res.render("guest")
});

//Sign up routes

   //show sign up
router.get("/signup", function(req, res){
    res.render("signup")
});

    
   //handle signup
router.post("/signup", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
            req.flash("error", err.message);
            return res.render("signup");
       } 
       passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to my site. It's nice to meet you");
            res.redirect("/guest");
       });
    });
});

//Login route show
router.get("/login", function(req,res){
     res.render("login");
     
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/guest",
    failureRedirect: "/login",
    failureFlash : true,
    successFlash: true
}), function(req, res){
   
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out successfully");
    res.redirect("/")
});

//show route
router.get("/:id", function(req, res){
    Project.findById(req.params.id, function(err,foundProject){
        if(err){
            res.redirect("/");
        } else{
            res.render("show", {project: foundProject});
            // console.log(foundProject);
        }
    });
    
   
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
}

module.exports = router;