const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const localStrategy = require("passport-local");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../model/user_model");
const keys = require("../keys/keys");


//passport setup


passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	User.findById((id)).then((user)=>{
		done(null,user);
	})
});

//passport local setup

passport.use(new localStrategy(User.authenticate()));

//passport google OAuth2.0 setup

passport.use(new GoogleStrategy({
    clientID: keys.google_clientId,
    clientSecret: keys.google_clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId : profile.id}).then((currentUser)=>{
    	if(currentUser){
    		done(null,currentUser);
    	}
    	else{
    		new User({
    			username:profile.displayName,
                googleId:profile.id,
                email:profile._json.email
    		}).save().then((newUser)=>{
    			done(null,newUser);
    		})
    	}
    })
  }
));

//passport facbook setup

passport.use(new FacebookStrategy({
    clientID: keys.facebook_clientId,
    clientSecret: keys.facebooK_clientSecret,
    callbackURL: "http://localhost:3000/auth/facebook/redirect",
    profileFields:['displayName','id','emails']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookId : profile.id}).then((currentUser)=>{
    	if(currentUser){
    		done(null,currentUser);
    	}
    	else{
    		new User({
    			username:profile.displayName,
                facebookId:profile.id,
                email : profile._json.email
    		}).save().then((newUser)=>{
    			done(null,newUser);
    		})
    	}
    })
  }
));
