

// authorisation middleware
const isloggedin = (req,res,next) => {
	if (req.isAuthenticated()){
		return next();	
     }
   else{
	   res.redirect('/login');
   }
}
module.exports= isloggedin;