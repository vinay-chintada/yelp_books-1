const Comment= require("../models/comment");

const CheckCommentOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const comment = await Comment.findById(req.params.commentid).exec();
		 if(req.user._id.equals(comment.user.id)){
			 next();
		 }else{
			 res.redirect("back");
		 }
	}else{
		res.redirect("/login");
	}
}
module.exports = CheckCommentOwner;