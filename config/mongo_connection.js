const mongoose = require("mongoose");
const key = require("../keys/keys");


module.exports =async()=>{await mongoose.connect(key.mongo_uri,{ useNewUrlParser: true ,  useUnifiedTopology: true },()=>{
    console.log("mongodb connected");
})};