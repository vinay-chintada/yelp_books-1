//======================
//SELECT ELEMENTS
//======================

const upvoteBtn = document.getElementById("upvote-btn");
const downvoteBtn = document.getElementById("downvote-btn");

//======================
//HELPER FUNCTION
//======================
const sendVote = async(voteType) => {
	//build fetch options
 const options = {
	 method:"POST",
	 headers:{
		 'Content-Type':'application/json'
	 }
 }
 if(voteType === 'up'){
	 options.body = JSON.stringify({
		 voteType:"up",
	 	 Bookid
	 });
 }else if(voteType === 'down'){
	 options.body = JSON.stringify({
		 voteType:"down",
		 Bookid
	 });
 }else {
	 throw "voteTypw must be 'up' or 'down'"
 }
	//send fetch request
 await fetch("/comics/vote",options)
	.then(data => {
	 return data.json()
     })
	.then(res => {
	 console.log(res)
     })
	.catch(err => {
	 console.log(err)
     })
}





//======================
//ADD EVENT LISTENERS
//======================
upvoteBtn.addEventListener( "click" , async function() {
sendVote('up');
});

downvoteBtn.addEventListener( "click" , async function() {
sendVote('down');
});