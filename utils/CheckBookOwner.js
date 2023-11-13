const Book= require("../models/book");

const CheckBookOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const book = await Book.findById(req.params.id).exec();
		 if(req.user._id.equals(book.owner.id)){
			 next();
		 }else{
			 res.redirect("back");
		 }
	}else{
		res.redirect("/login");
	}
}
module.exports = CheckBookOwner;