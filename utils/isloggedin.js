

// authorisation middleware
const isloggedin = (req,res,next) => {
	if (req.isAuthenticated()){
		return next();	
     }
   else{
	   req.flash("error","hey!...you must be logged in to this,Dummy!!");
	   res.redirect('/login');
   }
}
module.exports= isloggedin;