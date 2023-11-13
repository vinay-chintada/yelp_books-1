
const Book= require("../models/book");
const Comment= require("../models/comment"); 

const book_seeds= [
	{
	  title: 'Tony Stark: Iron Man Vol. 1',
	  description: "Iron Man is the superhero persona of Anthony Edward (Tony) Stark, a businessman and engineer who runs the company Stark Industries. Beginning his career as a weapons manufacturer, he is captured in a war zone, and his heart is severely injured by shrapnel. To sustain his heart and escape his captors, he builds a technologically advanced armor.",
	  author: 'marvel Grandpa',
	  publisher: 'marvel',
	  date: 2023-11-02,
	  genre: 'sci-fi',
	  series: 'Avengers series',
	  issue: '2',
	  color: true,
	  image:
	   'https://m.media-amazon.com/images/I/811wdFukWfL._SY466_.jpg'
	},
	{ title: 'Naruto chapter -1',
	  description:"Twelve years ago the Village Hidden in the Leaves was attacked by a fearsome threat. A nine-tailed fox spirit claimed the life of the village leader, the Hokage, and many others. Today, the village is at peace and a troublemaking kid named Naruto is struggling to graduate from Ninja Academy. His goal may be to become the next Hokage, but his true destiny will be much more complicated. The adventure begins now!",
	  author: 'Anime fan club',
	  publisher: 'Ninja publications',
	  date: 2023-12-07,
	  genre: 'manga',
	  series: 'Naruto shippuden ',
	  issue: '1',
	  color: true,
	  image:
	   'https://dwgkfo5b3odmw.cloudfront.net/manga/thumbs/thumb-603-nar_01_web.jpg'
	},
	{ title: 'Harry Potter and the Philosopher\'s Stone',
	  description:"Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's conflict with Lord Voldemort, a dark wizard ",
	  author: 'jk rouling',
	  publisher: 'Hogwarts ',
	  date: 2003-01-14,
	  genre: 'shonen',
	  series: 'journal',
	  issue: '143',
	  color: true,
	  image:
	   'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg'
	}
]

const seed= async () => {
	// delette the current book info
	await Book.deleteMany();
	console.log("Deleted the books");
	await Comment.deleteMany();
	console.log("Deleted the comments");
	//create three books
	// for(const book_seed of book_seeds){
	// 	let book= await Book.create(book_seed);
	// 	console.log("Created a new book" , book.title);
	// 	//create new comment for each book
	// 	await Comment.create({
	// 		user:"deadpool",
	// 		text:"I wuv the book",
	// 		Bookid:book._id
	// 	})
	// 	console.log("created the comments")
	// }
	
}




module.exports = seed;