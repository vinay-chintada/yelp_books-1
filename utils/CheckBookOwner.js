const Book= require("../models/book");

const CheckBookOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const book = await Book.findById(req.params.id).exec();
		 if(req.user._id.equals(book.owner.id)){
			 next();
		 }else{
			 req.flash("error","you are the owner of the book");
			 res.redirect("back");
		 }
	}else{
		req.flash("error","you are not logged in !");
		res.redirect("/login");
	}
}
module.exports = CheckBookOwner;