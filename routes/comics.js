//imports
const express = require('express');
const router = express.Router();
const Book= require("../models/book");
const Comment= require("../models/comment");
const isloggedin=require("../utils/isloggedin");
const CheckBookOwner=require("../utils/CheckBookOwner");
//index
router.get("/", async (req,res) => {
	try{
		const comics = await Book.find().exec();
		res.render("comics",{comics});
	}catch(err){
		console.log(err);
	}
});

//Create
router.post("/", isloggedin, async (req,res) => {
	console.log(req.body);
	const genre= req.body.genre.toLowerCase();
	const newBook = {
		title:req.body.title,
		description:req.body.description,
		author:req.body.author,
		publisher:req.body.publisher,
		date:req.body.date,
		genre,
		series:req.body.series,
		issue:req.body.issue,
		color:!!req.body.color,
		image:req.body.image,
		owner: {
			id:req.user._id,
			username:req.user.username
		},
		upvotes:[req.user.username],
		downvotes:[]
	}
	try{
		const book = await Book.create(newBook);
		console.log(book);
		req.flash("success","comic created");
		res.redirect("/comics/"+ book._id );
	}catch(err){
		console.log(err);
		req.flash("error","error in creating comic");
		res.redirect("/comics");
	}
	
})
//New
router.get("/new",isloggedin, (req,res) =>{
	res.render("comics_new");
})
//Search 
router.get("/search", async (req,res) => {
	try{
		const comics = await Book.find({
			$text:{
		        $search:req.query.term
		}});
		res.render("comics",{comics}); 
	}catch(err){
		console.log(err);
		res.send("you broke in comics  search");
	}
})
// genre
router.get("/genre/:genre", async (req,res) => {
	const validGenres =["action","sci-fi","shonen","manga","donghua","supernatural","fantasy","slice-of-life","comedy","romance" ]
	if(validGenres.includes(req.params.genre.toLowerCase())){
		const comics = await Book.find({genre : req.params.genre}).exec();
		res.render("comics",{comics});
		}
	else{
		res.send("enter valid genre");
		}
		
	
});
//vote
router.post("/vote",isloggedin,async (req,res) => {
	console.log("reqbody:",req.user,req.body);
	const book = await Book.findById(req.body.Bookid)
    const alreadyUpvoted = book.upvotes.indexOf(req.user.username); // will be -1 if not found
    const alreadyDownvoted = book.downvotes.indexOf(req.user.username); // will be -1 if not found
	
	let response = {}
	//voting logic
	if(alreadyUpvoted===-1 && alreadyDownvoted===-1){// has not voted
		if(req.body.voteType === "up"){//up voting
			book.upvotes.push(req.user.username);
			book.save();
			response={message:"Upvote tallied!",code:1};
		}else if(req.body.voteType === "down"){//down voting
			book.downvotes.push(req.user.username);
			book.save();
			response= {message: "Downvote tallied!",code: -1};
		}else{
			response={message:"Error -1",code:"err"}
		}
	}else if (alreadyUpvoted >= 0){ // has already voted up
		if(req.body.voteType === "up"){//up voting
			book.upvotes.splice(alreadyUpvoted,1);
			book.save();
			response={message:"Upvote removed",code:0}
		}else if(req.body.voteType === "down"){//down voting
			book.upvotes.splice(alreadyUpvoted,1);
			book.downvotes.push(req.user.username);
			book.save();
			response= {message: "Changed to Downvote" ,code:-1}
		}else{
			response={message:"Error -2",code:"err"}
		}
		
	}else if(alreadyDownvoted >= 0){// has already voted down
		if(req.body.voteType === "up"){//up voting
			book.downvotes.splice(alreadyDownvoted,1);
			book.upvotes.push(req.user.username);
			book.save();
			response= {message: "Changed to Upvote",code:1} 
		}else if(req.body.voteType === "down"){//down voting
			book.downvotes.splice(alreadyDownvoted,1);
			book.save();
			response={message: "Downvote removed",code:0}
		}else{
		    response={message:"Error -3",code:"err"}
		}	
	}else{
		response={message:"Error -4",code:"err"}
	}
	//update score immediately prior to sending 
	response.score=book.upvotes.length - book.downvotes.length;
	
	res.json(response);
});
//Show
router.get("/:id",async (req,res) => { 
	try{
		const book = await Book.findById(req.params.id).exec();
		const comments = await Comment.find({ Bookid: req.params.id});
		res.render("comics_show",{book,comments});
	}catch(err){
		console.log(err);
		res.send("you broke it in /comics/:id");
	}	
})
	
// Edit
router.get("/:id/edit",CheckBookOwner, async (req,res) => {
	const book = await Book.findById(req.params.id).exec();
	req.flash("success","comic edited successsfully!");
	 res.render("comics_edit",{book})
})
//update
router.put("/:id/", CheckBookOwner, async (req,res) => {
	const genre= req.body.genre.toLowerCase();
	const newBook = {
		title:req.body.title,
		description:req.body.description,
		author:req.body.author,
		publisher:req.body.publisher,
		date:req.body.date, 
		genre,
		series:req.body.series,
		issue:req.body.issue,
		color:!!req.body.color,
		image:req.body.image
	}
    
	try{
		const book = await Book.findByIdAndUpdate(req.params.id , newBook ,{new: true}) .exec();
		console.log(book);
	    req.flash("success","updated the comic");
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		req.flash("error","failed to update the comic");
		res.redirect("/comics");
	}
})
//Delete
router.delete("/:id", CheckBookOwner, async (req,res) => {
	try {
		const delbook = await Book.findByIdAndDelete(req.params.id).exec();
		console.log(delbook);
		req.flash("success","deleted the comic");
		res.redirect("/comics");
	}catch(err){
		console.log(err);
		req.flash("error","failed to deleted the comic");
		res.redirect("/comics");
	}
}) 

module.exports = router;