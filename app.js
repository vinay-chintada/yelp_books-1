//==========================================================================
// IMPORTS
//==========================================================================
// NPM IMPORTS
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require('morgan');
const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//CONFIG IMPORTS
try{
	var config= require('./config');
}catch(e){
	console.log("could not import config,this is probably means you are not working locally");
	console.log(e);
}


//ROUTER IMPORTS
const mainRoutes = require('./routes/main');
const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/authentication');

// MODEL IMPORTS
const Book= require("./models/book");
const Comment= require("./models/comment");
const User= require("./models/user");
//==========================================================================
// DEVELOPMENT IMPORTS
//==========================================================================
//MORGAN
app.use(morgan('tiny'));

//SEED THE DB 
// const seed = require('./utils/seed_db');
// seed();

//==========================================================================
// CONFIG
//==========================================================================

//connecting to database
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});
}catch(e){
	console.log("could not import config,this is probably means you are not working locally");
	mongoose.connect(process.env.DB_CONNECTION_STRING ,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
}

	    
//  Express config
app.set("view engine","ejs");
app.use(express.static("public"));
// express session
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUnintialized: false
}));

// Body Parser config
app.use(bodyParser.urlencoded({extended:true}));
//flash connect
app.use(flash());
 
//passport config
app.use(passport.initialize());
app.use(passport.session());//allows persistant sessions
passport.serializeUser(User.serializeUser());//Encodes data into the session (passport-local-mongoose)
passport.deserializeUser(User.deserializeUser());//Decodes data from the session(passport-local-mongoose)
passport.use(new LocalStrategy(User.authenticate())); //use the local strategy
// Method override config
app.use(methodOverride('_method'));
// current user middleware config
app.use((req,res,next) => {
		res.locals.user=req.user;
	    next();
});
  //  ROUTES config
app.use('/',mainRoutes);
app.use('/',authRoutes);
app.use("/comics",comicRoutes);
app.use("/comics/:id/comments",commentRoutes);
//==========================================================================
// LISTEN
//==========================================================================
app.listen(process.env.PORT || 3000,() => {
	console.log("app is running");
}) 