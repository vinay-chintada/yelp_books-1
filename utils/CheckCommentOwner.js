const Comment= require("../models/comment");

const CheckCommentOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const comment = await Comment.findById(req.params.commentid).exec();
		 if(req.user._id.equals(comment.user.id)){
			 next();
		 }else{
			 req.flash("error","you are the owner of the comment");
			 res.redirect("back");
		 }
	}else{
		req.flash("error","you are not logged in !");
		res.redirect("/login");
	}
}
module.exports = CheckCommentOwner;