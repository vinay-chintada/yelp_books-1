const express = require('express');
const router = express.Router();
const passport = require('passport');
const User= require("../models/user");


router.get('/signup',(req,res) => {
	res.render('signup');
});

router.post('/signup', async (req,res) => {
	try{
		const newUser = await User.register(new User({
			username:req.body.username,
			email:req.body.email
			
		}),req.body.password);
		req.flash("success",`Signed up as ${newUser.username}`)
		passport.authenticate('local')(req,res , () => {
			res.redirect("/comics");
		});
	}catch(err){
		console.log(err);
		res.send(err);
	}
})
//login show form
router.get('/login',(req,res) => {
	res.render('login');
});
// login 
router.post('/login',passport.authenticate('local',{
		successRedirect:'/comics',
		failureRedirect:'/login',
		failureFlash:true,
		successFlash:true,
		successFlash:"Logged in Successfully!"
}));
router.get('/logout', (req,res) => {
	req.logout(function(err) {
      if (err) { return next(err); }
	  req.flash("success","Logged out Successfully!!");
      res.redirect('/comics');
	  
    })
});

module.exports = router;