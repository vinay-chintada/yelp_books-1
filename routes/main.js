const express = require('express');
const router = express.Router();
const isloggedin=require("../utils/isloggedin");

router.get("/",(req,res) => {
	res.render("landing");
	
});
router.get('/account' , isloggedin, (req, res) => {
	res.render('account');
});


module.exports = router;