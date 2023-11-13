const mongoose = require("mongoose");

const commentschema = new mongoose.Schema({
	user:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username : String
	},
	text:String,
	Bookid:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Book"
	}
});
 
const comment= new mongoose.model("comment",commentschema);

module.exports = comment;	