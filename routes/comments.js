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
		console.log(comment);
		res.redirect(`/comics/${req.body.Bookid}`)
	}catch(err){
		console.log(err)
		res.send("you broke.. in the comment post");
	}
})
//comment edit
router.get("/:commentid/edit",CheckCommentOwner, async(req,res) =>{
	try{
		const book=await Book.findById(req.params.id).exec();
		const comment =  await Comment.findById(req.params.commentid).exec();
		console.log("book:",book);
		console.log("comment:",comment);
		res.render("comments_edit",{book,comment});
		
	}catch(err){
		console.log(err);;
	}
})
//update comment
router.put("/:commentid", CheckCommentOwner, async (req,res) => {
	try{
	    const comment = await Comment.findByIdAndUpdate(req.params.commentid, {text: req.body.text}, {new:true});
		console.log(comment);
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("you broke in the comment update put")
	}
})
//delete comment
router.delete("/:commentid", CheckCommentOwner, async (req,res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentid);
		console.log(comment);
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("broken in delete comment")
	}
})

module.exports = router; 