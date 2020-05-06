const router = require("express").Router();
const passport = require("passport");
const User = require ("../model/user_model");

router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/redirect',isloggedin, passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/logged");
});

//facebook routes

router.get('/auth/facebook',passport.authenticate('facebook',{scope : ['email']}));

router.get('/auth/facebook/redirect',isloggedin, passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/logged');
});



router.get("/register",(req,res)=>{
    res.render("register");
});

router.post("/register",(req,res)=>{
    let newUser = new User({username : req.body.username,email : req.body.email});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,()=>{
            
            res.redirect("/profile");
        });
    });
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
	successRedirect:"/profile",
	failureRedirect:"/login"
}),(req,res)=>{

});




router.get("/logged",isloggedin,(req,res)=>{
	res.redirect("/profile");
});

router.get("/profile",isloggedin,(req,res)=>{
    res.render("profile",{user:req.user.username});
})

router.get("/auth/logout",(req,res)=>{
	req.logout();
    res.clearCookie("connect.sig")
    res.redirect('/'); 
});


router.get("/",(req,res)=>{
    res.render("index"); 
});


function isloggedin(req,res,next){
	if(req.user){
		next();
	}
	else{
		console.log("loggin first");
		res.redirect("/");
	}
}

module.exports=router;
