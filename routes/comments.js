//imports
const express = require('express');
const router = express.Router({mergeParams: true});
const Comment= require("../models/comment");
const Book = require("../models/book");
const isloggedin=require("../utils/isloggedin");
const CheckCommentOwner = require("../utils/CheckCommentOwner");
//new comment
router.get("/new",isloggedin , (req,res) =>{
	res.render("comments_new",{Bookid: req.params.id})
})

// create comments
router.post("/", isloggedin, async (req,res) => {
	try{
			const comment = await Comment.create({
			user: {
				id:req.user._id,
				username:req.user.username
			},
			text:req.body.text,
			Bookid:req.body.Bookid
			});
		req.flash("success","comment created!");
		res.redirect(`/comics/${req.body.Bookid}`)
	}catch(err){
		console.log(err);
		req.flash("error","failed to create comment");
		res.redirect("/comics");
	}
})
//comment edit
router.get("/:commentid/edit",CheckCommentOwner, async(req,res) =>{
	try{
		const book=await Book.findById(req.params.id).exec();
		const comment =  await Comment.findById(req.params.commentid).exec();
		req.flash("success","edited comment successfully");
		res.render("comments_edit",{book,comment});
		
	}catch(err){
		console.log(err);
		req.flash("error","failed to edit comment");
		res.redirect("/comics");
	}
})
//update comment
router.put("/:commentid", CheckCommentOwner, async (req,res) => {
	try{
	    const comment = await Comment.findByIdAndUpdate(req.params.commentid, {text: req.body.text}, {new:true});
		req.flash("success","comment updated!");
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		req.flash("error","failed to update comment");
		res.redirect("/comics");
	}
})
//delete comment
router.delete("/:commentid", CheckCommentOwner, async (req,res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentid);
		console.log(comment);
		req.flash("success","comment deleted!");
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		req.flash("error","failed to delete comment");
		res.redirect("/comics");
	}
})

module.exports = router; 