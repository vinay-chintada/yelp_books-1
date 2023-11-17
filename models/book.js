const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
	title:String,
	description:String,
	author:String,
	publisher:String,
	date:Date,
	series:String,
	issue:String,
	genre:String,
	color:Boolean,
	image:String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username : String
	},
	upvotes:[String],
	downvotes:[String]
});
 bookschema.index({
	 '$**':'text'
 });
const Book= new mongoose.model("book",bookschema);

module.exports = Book;	