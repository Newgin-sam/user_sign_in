const   express = require("express"),
        mongoose = require("mongoose"),
        bodyParser = require("body-parser"),
        cookieSession = require("cookie-session"),
        passport = require("passport"),
        app = express();

const   dbconnection = require ("./config/mongo_connection"), 
        User = require ("./model/user_model"),
        routes = require("./routes/app_routes");

require("./config/passport_config");
app.use(express.static(__dirname + "/public"));


app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
	name:"auth session",
	keys:['key1','key2']
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);



app.listen("3000",()=>{
    console.log("server started at port 3000");
});


