//======================
//SELECT ELEMENTS
//======================

const upvoteBtn = document.getElementById("upvote-btn");
const downvoteBtn = document.getElementById("downvote-btn");
const score = document.getElementById("score");
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
	 handleVote(res.score,res.code)
     })
	.catch(err => {
	 console.log(err)
     })
}
const handleVote = (newScore,code) => {
	// update the score
	score.innerText = newScore;
	//update  vote btns colors
   if(code === 0){
	   upvoteBtn.classList.remove("btn-success");
	   upvoteBtn.classList.add("btn-outline-success");
	   downvoteBtn.classList.remove("btn-danger");
	   downvoteBtn.classList.add("btn-outline-danger");
   }else if(code === 1){
	   upvoteBtn.classList.remove("btn-outline-success");
	   upvoteBtn.classList.add("btn-success");
	   downvoteBtn.classList.remove("btn-danger");
	   downvoteBtn.classList.add("btn-outline-danger");
   }else if(code === -1){
	   upvoteBtn.classList.remove("btn-success");
	   upvoteBtn.classList.add("btn-outline-success");
	   downvoteBtn.classList.remove("btn-outline-danger");
	   downvoteBtn.classList.add("btn-danger");
   }
	else{
	   console.colors("error in vote handle")
   }
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