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
		}
	}
	try{
		const book = await Book.create(newBook);
		console.log(book);
		res.redirect("/comics/"+ book._id );
	}catch(err){
		console.log(err);
		res.send("you broke in comics put");
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
		
	
})
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
		res.redirect(`/comics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("you broke it in /comics/id show");
	}
})
//Delete
router.delete("/:id", CheckBookOwner, async (req,res) => {
	try {
		const delbook = await Book.findByIdAndDelete(req.params.id).exec();
		console.log(delbook);
		res.redirect("/comics");
	}catch(err){
		console.log(err);
		res.send("you broke it in /delete")
	}
}) 

module.exports = router;